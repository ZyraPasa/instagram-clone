<script>
  import Layout from "../layout.svelte";
  import { goto, stores } from "@sapper/app";
  const { session } = stores();
  export let myProfile = {};
  export let sagment = "";
  let isMobileMenu = false;
  const changeMobileMenu = () => (isMobileMenu = !isMobileMenu);
  const processLogOut = async () => {
    document.cookie = `token= `;
    await goto("/login");
  };
</script>

<Layout bind:myProfile fullScreen={true}>
  <div class="edit" class:mobile-active={isMobileMenu}>
    <div class="edit-box">
      <div class="edit-box-menu">
        <ul>
          <li>
            <a href="/edit/account" class:active={sagment === "account"}>Profili Düzenle</a>
          </li>
          <li>
            <a href="/edit/password" class:active={sagment === "password"}>Şifreyi Değiştir</a>
          </li>
          <li>
            <a href="/" class:active={sagment === "logs"}>Giriş&Çıkış Hareketleri</a>
          </li>
          <li>
            <a href="/" on:click|preventDefault={processLogOut}><span style="color: red">Çıkış Yap</span></a>
          </li>
        </ul>
      </div>
      <div class="edit-box-content">
        <div class="mobile-menu" on:click={changeMobileMenu}>
          <span class="material-icons-outlined"> view_headline </span>
        </div>
        <slot />
      </div>
    </div>
  </div>
</Layout>

<style lang="scss">
  @import "./_style.scss";
</style>
