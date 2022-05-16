<script>
  export let own = false;
  export let message = "";
  export let imageUrl = "";
</script>

<div class="message-box" class:own>
  {#if !own}
    <div class="message-profile-image">
      <img src={imageUrl || "/photo/profile.png"} alt="profile" />
    </div>
  {/if}
  <div class="message-box-content">
    <div class="message">
      <p>{message}</p>
    </div>
  </div>
</div>

<style lang="scss">
  @import "./style.scss";
</style>
