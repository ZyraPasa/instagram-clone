<script>
  import Button from "../button/button.svelte";
  import { createEventDispatcher } from "svelte";
  export let formModal;
  export let title;
  const dispatch = createEventDispatcher();
  const closeModal = () => {
    formModal = false;
    dispatch("close");
  };
</script>

<div class="modal-forum" class:open={formModal}>
  <div class="forum">
    <div class="forum-head">
      <h3>{title}</h3>
      <span class="fas fa-times" on:click={closeModal} />
    </div>
    <div class="forum-body">
      <slot />
    </div>
    <div class="forum-footer">
      <Button text="Close" color="red" on:click={closeModal} />
      <Button text="Send" color="green" on:click />
    </div>
  </div>
</div>

<style lang="scss">
  .modal-forum {
    display: none;
    padding: 1em;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    z-index: 2;
    .forum {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      overflow: auto;
      color: black;
      width: 100%;
      max-width: 768px;
      margin-top: 1em;
      .forum-head {
        border-bottom: 1px solid gray;
        padding: 1em;
        display: grid;
        align-items: center;
        grid-template-columns: 1fr auto;
        span {
          font-size: 1.5em;
          color: gray;
          cursor: pointer;
        }
      }
      .forum-body {
        border: 1px solid gray;
        padding: 1em;
        overflow: auto;
      }
      .forum-footer {
        padding: 1em;
        display: grid;
        grid-auto-flow: column;
        justify-content: space-between;
      }
    }
  }
  .open {
    display: grid;
  }
</style>
