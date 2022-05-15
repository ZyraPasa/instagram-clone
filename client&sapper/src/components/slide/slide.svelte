<script>
  export let type;
  export let src;
  export let bgDark;
</script>

<div class="slider">
  {#if type === "video"}
    <video autoplay loop muted>
      <source {src} type="video/mp4" />
    </video>
  {/if}
  {#if bgDark}
    <div class="bg-dark" />
  {/if}
</div>

<style lang="scss">
  .slider {
    position: relative;
    display: grid;
    grid-template-rows: 100vh;
    overflow: hidden;
    video {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      object-fit: cover;
    }
    .bg-dark {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #171819;
      opacity: 0.65;
    }
  }
</style>
