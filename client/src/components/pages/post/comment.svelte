<script>
  export let data;
</script>

<div class="comment-box">
  <!-- <div class="comment-image">
    <a href="/">
      <img src={account.image || "/photo/profile.png"} alt="profile" />
    </a>
  </div> -->
  <div class="comment-text">
    <div class="comment">
      <a href="/">
        <div class="account-nick">
          {data.username}
        </div>
        {#if data.verified}
          <span class="material-icons" style="color: #3897f0">verified</span>
        {/if}
      </a>: {data.comment}
    </div>
  </div>
</div>

<style lang="scss">
  .comment-box {
    display: grid;
    .comment-text {
      display: grid;
      align-items: center;
      .comment {
        display: grid;
        grid-auto-flow: column;
        justify-content: start;
        a {
          font-weight: bold;
          display: grid;
          grid-auto-flow: column;
          justify-content: start;
          grid-gap: 0.2em;
        }
      }
    }
  }
</style>
