<script>
  export let title;
  export let content;
  export let image;
</script>

<div class="image-card">
  <img src={image} alt={title} />
  <div class="image-hover">
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
</div>

<style lang="scss">
  .image-card {
    position: relative;
    img {
      width: 100%;
      height: auto;
    }
    .image-hover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 2em 1em;
      background-color: black;
      color: white;
      opacity: 0;
      transition: opacity 0.4s ease-in-out;
      p {
        margin-top: 1em;
        font-size: 0.8em;
      }
    }
    &:hover {
      .image-hover {
        opacity: 0.9;
        h3 {
          animation: nameText 0.7s ease-in-out;
        }
        p {
          animation: rankText 0.7s ease-in-out;
        }
      }
    }
  }
  @keyframes rankText {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes nameText {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
