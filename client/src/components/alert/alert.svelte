<script>
  export let alert;
  import { AlertStore } from "../../stores/alert.js";
</script>

<div class="alert {alert.type}" class:open={$AlertStore.isOpen}>
  <div class="alert-text">
    <span class={alert.icon} />
    {alert.text}
  </div>
  <div class="alert-close-button">
    <span class="fas fa-times" />
  </div>
</div>

<style lang="scss">
  .alert {
    z-index: 3;
    display: none;
    position: fixed;
    bottom: 1%;
    right: 1%;
    width: auto;
    color: white;
    grid-template-columns: 1fr auto;
    grid-gap: 1em;
    background: transparent;
    border-left: 12px solid transparent;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    animation: alertShow 1s ease-in-out;
    z-index: 99;
    .alert-text {
      width: max-content;
      overflow: auto;
      padding: 1em;
      span {
        color: transparent;
        margin-right: 5px;
      }
    }
    .alert-close-button {
      display: grid;
      align-items: center;
      padding: 1em;
      cursor: pointer;
      background: transparent;
    }
  }

  .open {
    display: grid;
  }

  //////////// Types ////////////

  .succes {
    color: white;
    background: rgb(125, 171, 46);
    border-color: rgb(107, 150, 32);
    .alert-text {
      span {
        color: rgb(87, 124, 22);
      }
    }
    .alert-close-button {
      background: rgb(107, 150, 32);
    }
  }
  .danger {
    color: white;
    background: rgb(252, 75, 108);
    border-color: rgb(224, 54, 86);
    .alert-text {
      span {
        color: rgb(187, 36, 63);
      }
    }
    .alert-close-button {
      background: rgb(224, 54, 86);
    }
  }
  .warning {
    color: white;
    background: #ffb22b;
    border-color: #e08e0b;
    .alert-text {
      span {
        color: #c97c00;
      }
    }
    .alert-close-button {
      background: #e08e0b;
    }
  }

  @keyframes alertShow {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media only screen and (max-width: 500px) {
    .alert {
      width: 100%;
    }
  }
</style>
