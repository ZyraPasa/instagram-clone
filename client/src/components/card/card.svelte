<script>
  import Paragraph from "../paragraph/paragraph.svelte";
  import Heading from "../heading/heading.svelte";
  export let icon;
  export let title;
  export let content;
</script>

<div class="card">
  <div class="card-icon">
    <span class={icon} />
  </div>
  <div class="card-title">
    <Heading fontSize="1.2em">{title}</Heading>
  </div>
  <div class="card-content">
    <Paragraph>{content}</Paragraph>
  </div>
</div>

<style lang="scss">
  .card {
    padding: 2em;
    text-align: center;
    border: 1px solid lightgray;
    .card-icon {
      margin-bottom: 1em;
      font-size: 2em;
      color: #888;
    }
    .card-title {
      margin-bottom: 1em;
    }
    .card-content {
      margin-bottom: 1em;
      color: #888;
    }
  }
</style>
