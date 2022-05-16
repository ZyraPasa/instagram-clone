<script>
  export let iconName = "";
  export let marginTop = "";
</script>

<div class="more-button" style="margin-top: {marginTop};">
  <button on:click>
    {#if iconName}
      <span class="material-icons-outlined">{iconName}</span>
    {/if}
    Daha Fazla
  </button>
</div>

<style lang="scss">
  .more-button {
    display: grid;
    justify-content: center;
    align-items: center;
    button {
      font-size: 1em;
      cursor: pointer;
      border: 1px solid transparent;
      font-weight: 400;
      text-align: center;
      line-height: 1.25;
      transition: all 0.5s ease-in-out;
      background-color: #fff;
      color: #444;
      padding: 5px 9px;
      color: black;
      border-color: #dbdbdb;
      &:hover {
        background-color: #e7e7e7;
      }
      display: grid;
      grid-auto-flow: column;
      justify-content: center;
      align-items: center;
    }
  }
</style>
