<script>
  import Inputs from "../../input-new/input.svelte";
  import { goto } from "@sapper/app";
  import { AlertStore } from "../../../stores/alert.js";
  import { validateMaxLength } from "../../../_lib/validationHelpers/validateMaxLength";
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  const { session } = stores();

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
  let activeSubList = undefined;
  let isMobileMenu = false;
  let windowWidth = 0;
  let inputFocus = false;
  export let myProfile = {};
  let userList = [];
  let formInputs = {
    search: {
      value: "",
      validate: "",
    },
  };
  /////

  const onFocus = () => (inputFocus = true);
  const onFocusOut = () => (inputFocus = false);
  const changeActiveSubList = (index) => {
    if (index === activeSubList) return (activeSubList = undefined);
    activeSubList = index;
  };
  const changeMobileMenu = () => (isMobileMenu = !isMobileMenu);

  //////////////

  const searchAccount = async () => {
    const resultSearchAccount = await fetch(`http://localhost:5500/users/search/${formInputs.search.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
    });
    const result = await resultSearchAccount.json();
    if (!result.status) return;
    userList = result.data;
  };

  const processSearch = async () => {
    if (!formInputs.search.value) return;
    const keys = Object.keys(formInputs);
    let activeError = [];
    keys.forEach((k) => {
      if (!formInputs[k].validate) activeError.push(k);
    });
    if (activeError.length) return; // hata
    await searchAccount();
  };

  //////////////
  const processLogOut = async () => {
    document.cookie = `token=`;
    await goto("/login");
  };
</script>

<svelte:window bind:outerWidth={windowWidth} />

<header>
  <div id="header-content">
    <div class="header-image">
      <a href="/">ZyraPasaa</a>
    </div>
    <div class="header-search">
      <div class="icons">
        <span class="material-icons-outlined"> search </span>
      </div>
      <Inputs
        bind:value={formInputs.search.value}
        bind:valid={formInputs.search.validate}
        validation={[new validateMaxLength(formInputs.search.value, "Burası", 64)]}
        settings={{ placeholder: "Ara" }}
        style={{ background: "none", width: "100%", "font-weight": "bold", color: "gray" }}
        on:click={onFocus}
        on:keyup={processSearch}
      />
      <ul class:open-search={inputFocus}>
        {#if !userList.length}
          <div class="no-found">
            <li>Hiç bir sonuç bulunamadı!</li>
          </div>
        {:else}
          {#each userList as user}
            <li>
              <a href="/profile/{user.username}">
                <div class="image-box">
                  <img src={user.avatar_url || "/photo/default-profile.png"} alt="profile" />
                </div>
                <div class="text-box">
                  <div class="username">
                    {user.username}
                    {#if user.verified}
                      <span class="material-icons-outlined"> verified </span>
                    {/if}
                  </div>
                  <div class="name">{user.name}</div>
                </div>
              </a>
            </li>
          {/each}
        {/if}
      </ul>
      <div class="close-search-menu" class:open-close-search-menu={inputFocus} on:click={onFocusOut}>
        <span class="material-icons-outlined"> close </span>
      </div>
    </div>
    <div class="mobile-open" on:click={changeMobileMenu}>
      <span class="material-icons-outlined">view_headline</span>
    </div>
    <div class="header-menu" class:open={windowWidth <= 1024} class:openMobile={isMobileMenu}>
      <ul>
        <li>
          <a href="/">
            <span class="material-icons-outlined">home</span>
            <div class="title">Home</div>
          </a>
        </li>
        <li>
          <a href="/direct">
            <span class="material-icons-outlined">send</span>
            <div class="title">Message</div>
          </a>
        </li>
        <li>
          <a href="/">
            <span class="material-icons-outlined">add_box</span>
            <div class="title">New Post</div>
          </a>
        </li>
        {#if windowWidth <= 1024}
          <li>
            <a href="/notifications">
              <span class="material-icons-outlined">favorite_border</span>
              <div class="title">Notifications</div>
            </a>
          </li>
        {:else}
          <li on:click={() => changeActiveSubList("notification")}>
            <a href="/" on:click|preventDefault>
              <span class="material-icons-outlined">favorite_border</span>
              <div class="title">Notifications</div>
            </a>
            <div class="arrow" class:active={activeSubList === "notification"} />
            <ul
              class="notification"
              class:active={activeSubList === "notification"}
              on:click={() => changeActiveSubList(1)}
            >
              <li>
                <div class="profile-image">
                  <img src="/photo/profile-2.png" alt="profile" />
                </div>
                <div class="notification-text">
                  <span>123456789111111111</span> seni takip etmeye başladı!
                </div>
              </li>
              <li>
                <div class="profile-image">
                  <img src="/photo/profile-2.png" alt="profile" />
                </div>
                <div class="notification-text"><span>123456789111111111</span> bir yorumda senden bahsetti.</div>
              </li>
              <li>
                <div class="profile-image">
                  <img src="/photo/profile-2.png" alt="profile" />
                </div>
                <div class="notification-text"><span>ZyraPasaa</span> sizi takip etti.</div>
              </li>
              <li>
                <div class="profile-image">
                  <img src="/photo/profile-2.png" alt="profile" />
                </div>
                <div class="notification-text"><span>ZyraPasaa</span> sizi takip etti.</div>
              </li>
              <li>
                <div class="profile-image">
                  <img src="/photo/profile-2.png" alt="profile" />
                </div>
                <div class="notification-text"><span>ZyraPasaa</span> sizi takip etti.</div>
              </li>
              <li>
                <div class="profile-image">
                  <img src="/photo/profile-2.png" alt="profile" />
                </div>
                <div class="notification-text"><span>ZyraPasaa</span> sizi takip etti.</div>
              </li>
              <li>
                <div class="profile-image">
                  <img src="/photo/profile-2.png" alt="profile" />
                </div>
                <div class="notification-text"><span>ZyraPasaa</span> sizi takip etti.</div>
              </li>
              <li>
                <div class="profile-image">
                  <img src="/photo/profile-2.png" alt="profile" />
                </div>
                <div class="notification-text"><span>ZyraPasaa</span> sizi takip etti.</div>
              </li>
              <li>
                <div class="profile-image">
                  <img src="/photo/profile-2.png" alt="profile" />
                </div>
                <div class="notification-text"><span>ZyraPasaa</span> sizi takip etti.</div>
              </li>
              <li>
                <div class="profile-image">
                  <img src="/photo/profile-2.png" alt="profile" />
                </div>
                <div class="notification-text"><span>ZyraPasaa</span> sizi takip etti.</div>
              </li>
            </ul>
          </li>
        {/if}
        {#if windowWidth <= 1024}
          <li>
            <div class="profile-image">
              <a href="/profile/{myProfile.username}">
                <img src={myProfile.avatar_url || "/photo/default-profile.png"} alt="profile" />
                <div class="title">My Account</div>
              </a>
            </div>
          </li>
        {:else}
          <li on:click={() => changeActiveSubList("profile")}>
            <div class="profile-image">
              <a href="/" on:click|preventDefault>
                <img src={myProfile.avatar_url || "/photo/default-profile.png"} alt="profile" />
                <div class="title">My Account</div>
              </a>
            </div>
            <div class="arrow" class:active={activeSubList === "profile"} />

            <ul class="profile" class:active={activeSubList === "profile"} on:click={() => changeActiveSubList(1)}>
              <li>
                <a href="/profile/{myProfile.username}">
                  <span class="material-icons-outlined">account_circle</span>
                  Profilim
                </a>
              </li>
              <li>
                <a href="/edit/account">
                  <span class="material-icons-outlined">settings</span>
                  Ayarlar
                </a>
              </li>
              <li style="border-top: 1px solid gray;">
                <a href="/" on:click|preventDefault={processLogOut}>
                  <span class="material-icons-outlined">logout</span>
                  Çıkış Yap
                </a>
              </li>
            </ul>
          </li>
        {/if}
      </ul>
    </div>
  </div>
</header>

<style lang="scss">
  @import "./style.scss";
</style>
