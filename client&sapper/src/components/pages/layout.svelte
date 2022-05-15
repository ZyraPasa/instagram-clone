<script>
  import Header from "./header/header.svelte";
  export let fullScreen = false;
  export let padding = "1em";
  import { goto, stores } from "@sapper/app";
  const { session } = stores();
  import { AlertStore } from "../../stores/alert.js";
  import { onMount } from "svelte";
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
  import { io } from "socket.io-client";
  const socket = io("http://localhost:8900", {
    auth: {
      token: $session.jwtKey,
    },
  });
  export let myProfile = {};

  const getMyProfile = async () => {
    const resultMyProfile = await fetch(`http://localhost:5500/users/profile/${$session.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
    });
    const result = await resultMyProfile.json();
    if (!result.status) return showAlert(result.message, "danger", "fas fa-times");
    myProfile = result.data;
  };

  onMount(async () => {
    getMyProfile();
  });

  ///
</script>

<main>
  <Header {myProfile} />
  <section style="padding: {padding}">
    <div class="page" class:full-screen={fullScreen}>
      <slot />
    </div>
  </section>
</main>

<style lang="scss">
  main {
    display: grid;
    grid-template-rows: 100vh;
    section {
      overflow-y: auto;

      background-color: #fafafa;
      z-index: 96;
      // padding: 1em;
      .page {
        position: relative;
        padding-top: 4em;
        max-width: 975px;
        width: 100%;
        margin: 0 auto;
        // overflow-y: auto;
      }
    }
  }
  .full-screen {
    height: 100%;
  }

  @media only screen and (max-width: 1024px) {
    main {
      section {
        padding: 0;
      }
    }
  }
</style>
