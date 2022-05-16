<script context="module">
  export async function preload(page, session) {
    if (page.path === "/login" || page.path === "/register") return {};
    let jwtKey = session.jwtKey;
    const confirmToken = await this.fetch("http://localhost:5500/jwtControl", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtKey}`,
      },
    });
    const resultConfirmToken = await confirmToken.json();
    if (!resultConfirmToken.status) {
      await this.redirect(302, "/login");
      return;
    } else {
      // console.log(resultConfirmToken);
      session.userId = resultConfirmToken.data.userId; // user id tutulacak sadece
      return {};
    }
  }
</script>

<script>
  export let segment;
  import Modal from "../components/modal/modal.svelte";
  import { ModalStore } from "../stores/modal";
  import Alert from "../components/alert/alert.svelte";
  import { AlertStore } from "../stores/alert.js";
</script>

<Modal modal={$ModalStore} />
<Alert alert={$AlertStore} />

<slot {segment} />
