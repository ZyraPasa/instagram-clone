<script>
  import Button from "../button/button.svelte";
  export let modal;
  import { ModalStore } from "../../stores/modal.js";
</script>

<div class="modal" class:open={$ModalStore.isOpen}>
  <div class="bg-dark" on:click={() => ($ModalStore.isOpen = false)} />
  <div class="modal-box">
    <div class="modal-head">
      <h3>{modal.title}</h3>
      <span class="fas fa-times" on:click={() => ($ModalStore.isOpen = false)} />
    </div>
    <div class="modal-body">
      <!-- <slot /> -->
      {@html modal.content}
    </div>
    <div class="modal-footer">
      <Button text="Close" color="red" on:click={() => ($ModalStore.isOpen = false)} />
    </div>
  </div>
</div>

<style lang="scss">
  .modal {
    position: fixed;
    z-index: 111;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    align-items: start;
    justify-content: center;
    padding: 1em;
    overflow: auto;
    .bg-dark {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.65);
    }
    .modal-box {
      margin-top: 10vh;
      z-index: 3;
      background: white;
      width: 100%;
      max-width: 1024px;
      animation: modal 0.7s ease-in-out;
      .modal-head {
        border-bottom: 1px solid gray;
        padding: 1em;
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        span {
          color: gray;
          cursor: pointer;
        }
      }
      .modal-body {
        padding: 1em;
        overflow: auto;
      }
      .modal-footer {
        border-top: 1px solid gray;
        padding: 1em;
      }
    }
  }
  .open {
    display: grid;
  }

  @keyframes modal {
    from {
      opacity: 0;
      transform: translateY(-60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media only screen and (max-width: 1024px) {
    .modal {
      .modal-box {
        max-width: 768px;
      }
    }
  }
</style>
