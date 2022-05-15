<script>
  export let title;
  export let number;
</script>

<div class="bar-header">
  <div class="bar-header-title">{title}</div>
  <div class="bar-header-percent">%{number}</div>
</div>
<div class="bar-body">
  <div class="bar-fill" style="width: {number}%;" />
</div>

<style lang="scss">
  .bar-header {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
  }
  .bar-body {
    position: relative;
    background-color: #ececec;
    height: 3px;
    margin-top: 1em;
    .bar-fill {
      position: absolute;
      height: 3px;
      background-color: black;
    }
  }
</style>
