<script>
  import { onMount } from "svelte";
  import Layout from "../components/pages/layout.svelte";
  import Post from "../components/pages/post/post.svelte";
  import Button from "../components/button/button.svelte";
  import MoreButton from "../components/moreButton/moreButton.svelte";
  import { goto, stores } from "@sapper/app";
  const { session } = stores();

  let myProfile = {};
  let storyBox;
  let maxScroll = 0;
  let activeScroll = 0;
  let windowWidth = 0;
  let activePosts = [];
  const scrollChangeRight = () => {
    storyBox.scrollLeft = storyBox.scrollLeft + 100;
    activeScroll = storyBox.scrollLeft;
  };
  const scrollChangeLeft = () => {
    storyBox.scrollLeft = storyBox.scrollLeft - 100;
    activeScroll = storyBox.scrollLeft;
  };

  const getFollowAllPostDetail = async () => {
    const resultFollowAllPostDetail = await fetch(
      `http://localhost:5500/posts/account/follows/allPostDetail/${activePosts.length}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${$session.jwtKey}`,
        },
      }
    );
    const result = await resultFollowAllPostDetail.json();
    if (!result.status) return; // hata mesajı
    if (!activePosts.length) return (activePosts = result.data);
    activePosts = [...activePosts, ...result.data];
  };

  onMount(async () => {
    maxScroll = storyBox.scrollWidth - storyBox.clientWidth;
    await getFollowAllPostDetail();
  });

  ///
</script>

<svelte:window bind:outerWidth={windowWidth} />

<svelte:head>
  <title>Ana Sayfa • ZyraPasaa</title>
</svelte:head>

<Layout fullScreen={true} bind:myProfile padding="1em 1em 0 1em">
  <div class="home">
    <div class="home-box">
      <div class="home-box-content">
        <div class="home-box-content-head">
          <div class="story-box" bind:this={storyBox}>
            <div class="story">
              <div class="story-image-box">
                <div class="story-image">
                  <img src="/photo/profile.png" alt="profile" />
                </div>
              </div>
              <div class="story-title">
                <span>zyrapasaa</span>
              </div>
            </div>
            <div class="story">
              <div class="story-image-box">
                <div class="story-image">
                  <img src="/photo/profile-2.png" alt="profile" />
                </div>
              </div>
              <div class="story-title">
                <span>licores</span>
              </div>
            </div>
            <div class="story">
              <div class="story-image-box">
                <div class="story-image">
                  <img src="/photo/profile-3.png" alt="profile" />
                </div>
              </div>
              <div class="story-title">
                <span>wazkar</span>
              </div>
            </div>
            <div class="story">
              <div class="story-image-box">
                <div class="story-image">
                  <img src="/photo/profile-4.png" alt="profile" />
                </div>
              </div>
              <div class="story-title">
                <span>skywalker</span>
              </div>
            </div>
            <div class="story">
              <div class="story-image-box">
                <div class="story-image">
                  <img src="/photo/profile-5.png" alt="profile" />
                </div>
              </div>
              <div class="story-title">
                <span>hasbelkader</span>
              </div>
            </div>
            <div class="story">
              <div class="story-image-box">
                <div class="story-image">
                  <img src="/photo/profile-6.png" alt="profile" />
                </div>
              </div>
              <div class="story-title">
                <span>maestro</span>
              </div>
            </div>
            <div class="story">
              <div class="story-image-box">
                <div class="story-image">
                  <img src="/photo/profile-7.png" alt="profile" />
                </div>
              </div>
              <div class="story-title">
                <span>seigard</span>
              </div>
            </div>
            <div class="story">
              <div class="story-image-box">
                <div class="story-image">
                  <img src="/photo/profile.png" alt="profile" />
                </div>
              </div>
              <div class="story-title">
                <span>zyrapasaa</span>
              </div>
            </div>
            <div class="story">
              <div class="story-image-box">
                <div class="story-image">
                  <img src="/photo/profile.png" alt="profile" />
                </div>
              </div>
              <div class="story-title">
                <span>zyrapasaa</span>
              </div>
            </div>
            <div class="story">
              <div class="story-image-box">
                <div class="story-image">
                  <img src="/photo/profile.png" alt="profile" />
                </div>
              </div>
              <div class="story-title">
                <span>zyrapasaa</span>
              </div>
            </div>
          </div>
          {#if windowWidth >= 800}
            {#if maxScroll != 0 && activeScroll != maxScroll}
              <div class="story-next-button" on:click={scrollChangeRight}>
                <span class="material-icons-outlined">arrow_forward_ios</span>
              </div>
            {/if}
            {#if activeScroll != 0}
              <div class="story-back-button" on:click={scrollChangeLeft}>
                <span class="material-icons-outlined">arrow_back_ios</span>
              </div>
            {/if}
          {/if}
        </div>
        <div class="home-box-content-body">
          {#if activePosts.length}
            <div class="posts">
              {#each activePosts as post}
                <Post postDetail={post} {myProfile} />
              {/each}
            </div>
            <MoreButton iconName="expand_more" marginTop="1em" on:click={getFollowAllPostDetail} />
          {/if}
        </div>
      </div>
      <div class="home-box-ads">
        <div class="home-box-ads-main">
          <div class="home-box-ads-head">
            <div class="home-box-ads-head-image">
              <img src={myProfile.avatar_url || "/photo/default-profile.png"} alt="profile" />
            </div>
            <div class="home-box-ads-head-content">
              <div class="title" style="font-weight: bold;">{myProfile.username}</div>
              <div class="name">{myProfile.name}</div>
            </div>
          </div>
          <div class="home-box-ads-body">
            <img src="/photo/300x300.png" alt="img" />
          </div>

          <div class="home-box-ads-footer">
            Copyright © 2022 All rights reserved by ZyraPasaa. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </div>
  </div>
</Layout>

<style lang="scss">
  @import "./_style.scss";
</style>
