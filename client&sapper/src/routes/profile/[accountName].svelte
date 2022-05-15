<script context="module">
  export async function preload(page, session) {
    return page.params;
  }
</script>

<script>
  import Layout from "../../components/pages/layout.svelte";
  import Button from "../../components/button/button.svelte";
  import { goto, stores } from "@sapper/app";
  const { session } = stores();
  import { AlertStore } from "../../stores/alert.js";
  import { onMount } from "svelte";
  export let accountName = "";
  const showAlert = (text, type, icon) => {
    if (!$AlertStore.isOpen) {
      $AlertStore.text = text;
      $AlertStore.type = type;
      $AlertStore.icon = icon;
      $AlertStore.isOpen = true;
      setTimeout(function () {
        $AlertStore.isOpen = false;
      }, 5000);
    }
  };
  let user = {};
  let activeData = [];
  let activePage = "posts";
  let followProcess = false;

  //

  let fileUpload;
  let fileUploadForm;

  const uploadAvatar = async (formData) => {
    return await fetch(`http://localhost:5500/users/change/avatar`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${$session.jwtKey}`,
      },
      body: formData,
    })
      .then((result) => {
        if (result.ok) return { status: true, message: "Başarılı bir şekilde avatar güncellendi!" };
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      })
      .catch((error) => {
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  };

  const handleFileUpload = async (e) => {
    console.log(e);
    if (e.target.files.length > 1) return showAlert("1 Resim seçebilirsiniz!", "danger", "fas fa-times");
    if (e.target.files[0].size > 1048576)
      return showAlert("En fazla 10MB yükleyebilirsiniz!", "danger", "fas fa-times");
    //

    const formData = new FormData(fileUploadForm);
    const result = await uploadAvatar(formData); // en alta
    console.log(result);
    if (result.status) await getUserDetail();
    // let render = new FileReader();
    // render.readAsDataURL(e.target.files[0]);
    // render.onload = (event) => {
    //   let img = new Image();
    //   img.src = event.target.result;
    //   img.onload = (r) => {
    //     console.log("Width: " + r.path[0].width);
    //     console.log("Heigth: " + r.path[0].height);
    //   };
    // };
  };

  //

  const getUserDetail = async () => {
    const resultUserDetail = await fetch(`http://localhost:5500/users/profile/detail/${accountName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
    });
    const result = await resultUserDetail.json();
    // if (!result.status) {
    //   showAlert(result.message, "danger", "fas fa-times");
    //   return await goto("/"); // BURASI KONTROL EDİLECEK
    // }
    user = result.data;
  };
  const getUserPosts = async () => {
    activePage = "posts";
    activeData = [];
    const resultUserPosts = await fetch(`http://localhost:5500/posts/account/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
    });
    const result = await resultUserPosts.json();
    user.postCount = result.data.length || "0";
    if (!result.status) return; // hata mesajı
    activeData = result.data;
  };
  const getUserLikePosts = async () => {
    activePage = "likes";
    activeData = [];
    const resultUserLikePosts = await fetch(`http://localhost:5500/posts/account/likes/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
    });
    const result = await resultUserLikePosts.json();
    if (!result.status) return; // hata mesajı
    activeData = result.data;
  };
  const getUserSavePosts = async () => {
    activePage = "saved";
    activeData = [];
    const resultUserLikePosts = await fetch(`http://localhost:5500/posts/account/saved/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
    });
    const result = await resultUserLikePosts.json();
    if (!result.status) return; // hata mesajı
    activeData = result.data;
  };
  const followControl = async () => {
    const resultFollowControl = await fetch(`http://localhost:5500/users/follow/control/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
    });
    const result = await resultFollowControl.json();
    followProcess = result;
  };
  const followAccount = async () => {
    await fetch(`http://localhost:5500/users/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
      body: JSON.stringify({ targetAccountId: user.id }),
    });
    await getUserDetail();
    await followControl();
  };
  const unfollowAccount = async () => {
    await fetch(`http://localhost:5500/users/follow`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
      body: JSON.stringify({ targetAccountId: user.id }),
    });
    await getUserDetail();
    await followControl();
  };

  onMount(async () => {
    await getUserDetail();
    await followControl();
    await getUserPosts();
  });

  //

  const gotoProfileEdit = async () => {
    await goto("/edit/account");
  };
</script>

<svelte:head>
  <title>{accountName} profili • ZyraPasaa</title>
</svelte:head>

<Layout>
  <div class="profile">
    <div class="profile-box">
      <div class="profile-box-detail">
        <div class="profile-box-detail-image">
          <div class="profile-box-detail-image-box">
            <img src={user.avatar_url || "/photo/default-profile.png"} alt="profile" />
            {#if user.id === $session.userId}
              <div class="new-profile-photo-box" on:click={() => fileUpload.click()}>
                <span class="material-icons-outlined"> add_a_photo </span>
              </div>
              <form bind:this={fileUploadForm} class="avatar-upload">
                <input
                  type="file"
                  name="profile"
                  accept="image/jpeg, image/png"
                  bind:this={fileUpload}
                  on:change={handleFileUpload}
                />
              </form>
            {/if}
          </div>
        </div>
        <div class="profile-box-detail-content">
          <div class="profile-box-detail-content-head">
            <div class="profile-box-detail-content-box-head-nick">
              <h2>{user.username || "Bilinmiyor"}</h2>
              {#if user.verified}
                <div class="verified">
                  <span class="material-icons">verified</span>
                </div>
              {/if}
            </div>
            <div class="profile-box-detail-content-box-head-settings">
              <div class="settings-button">
                {#if user.id === $session.userId}
                  <Button text="Profili Düzenle" borderRadius="0.5em" on:click={gotoProfileEdit} />
                {:else if followProcess === true}
                  <Button text="Takipten Çık" borderRadius="0.5em" on:click={unfollowAccount} />
                {:else}
                  <Button text="Takip Et" color="blue" size="custom" height="30px" on:click={followAccount} />
                {/if}
              </div>
              {#if user.id === $session.userId}
                <a href="/edit/account">
                  <span class="material-icons-outlined">settings</span>
                </a>
              {/if}
            </div>
          </div>
          <div class="profile-box-detail-content-body">
            <ul>
              <li>
                <span>{user.postCount}</span> gönderi
              </li>
              <li>
                <span>{user.followerCount}</span> takipçi
              </li>
              <li>
                <span>{user.followCount}</span> takip
              </li>
            </ul>
          </div>
          <div class="profile-box-detail-content-footer">
            <div class="profile-box-detail-content-footer-name">{user.name}</div>
            {#if user.biography}
              <div class="profile-box-detail-content-footer-biography">{user.biography}</div>
            {/if}
            {#if user.website}
              <div class="profile-box-detail-content-footer-website">
                <a href={user.website}>{user.website}</a>
              </div>
            {/if}
          </div>
        </div>
      </div>
      <div class="tablist">
        <ul>
          <li class:active={activePage === "posts"}>
            <a href="/" on:click|preventDefault={getUserPosts}>
              <span class="material-icons-outlined">apps</span>
              <span class="title">Gönderiler</span>
            </a>
          </li>
          <li class:active={activePage === "likes"}>
            <a href="/" on:click|preventDefault={getUserLikePosts}>
              <span class="material-icons-outlined">favorite_border</span>
              <span class="title">Beğenilenler</span>
            </a>
          </li>
          <li class:active={activePage === "saved"}>
            <a href="/" on:click|preventDefault={getUserSavePosts}>
              <span class="material-icons-outlined">bookmark_border</span>
              <span class="title">Kaydedilenler</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="profile-box-post">
        {#if activeData.length}
          {#each activeData as post}
            <div class="post-box">
              <div class="post-box-image">
                <img src={post.post_url} alt="post" />
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</Layout>

<style lang="scss">
  @import "./_style.scss";
</style>
