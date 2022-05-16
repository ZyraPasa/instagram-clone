<script context="module">
  export async function preload(page, session) {
    return page.params;
  }
</script>

<script>
  export let accountName = "";
  console.log(accountName);
</script>

<div class="stories">
  <div class="stories-box">
    <div class="stories">
      <div class="stories-image-box">
        <img src="/photo/karakter-başvurusu.jpg" alt="story" />
        <div class="next-story">
          <span class="material-icons-outlined"> arrow_forward_ios </span>
        </div>
        <div class="back-story">
          <span class="material-icons-outlined"> arrow_back_ios </span>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "./_style.scss";
</style>
