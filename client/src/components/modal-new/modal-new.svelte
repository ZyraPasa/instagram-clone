<script>
  export let isOpen = false;
  export let borderRadius = "";
</script>

<div class="modal-box" class:open={isOpen}>
  <div class="modal-box-main" style="border-radius: {borderRadius}">
    <slot />
  </div>
</div>

<style lang="scss">
  @import "./style.scss";
</style>
