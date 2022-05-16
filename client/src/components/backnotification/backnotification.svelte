<script>
  import Button from "../button/button.svelte";
  import Gridwrapper from "../gridwrapper/gridwrapper.svelte";
  import Heading from "../heading/heading.svelte";
  export let isOpen;
  export let text;
</script>

<div class="modal" class:open={isOpen}>
  <div class="bg-dark" on:click={() => (isOpen = false)} />
  <div class="modal-box">
    <div class="modal-head">
      <span class="fas fa-times" on:click={() => (isOpen = false)} />
    </div>
    <div class="modal-body">
      <Heading>{text}</Heading>
    </div>
    <div class="modal-footer">
      <Gridwrapper gridAutoFlow="column" gridGap="1em">
        <Button color="green" text="Evet" on:click />
        <Button color="red" text="Hayır" on:click={() => (isOpen = false)} />
      </Gridwrapper>
    </div>
  </div>
</div>

<style lang="scss">
  .modal {
    position: fixed;
    z-index: 99;
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
      background: rgba(0, 0, 0, 0.5);
    }
    .modal-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 3;
      background: white;
      width: 25%;
      animation: modal 1s ease-in-out;
      .modal-head {
        padding: 1em;
        display: grid;
        grid-auto-flow: column;
        justify-content: end;
        align-items: center;
        span {
          color: gray;
          cursor: pointer;
        }
      }
      .modal-body {
        padding: 1em;
        padding-top: 0;
        display: grid;
        grid-auto-flow: column;
        justify-content: center;
        overflow: auto;
      }
      .modal-footer {
        border-top: 1px solid #dbdbdb;
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
      top: 25%;
    }
    to {
      opacity: 1;
      top: 50%;
    }
  }
  @media only screen and (max-width: 1024px) {
    .modal {
      .modal-box {
        max-width: 768px;
        width: 100%;
      }
    }
  }
</style>
