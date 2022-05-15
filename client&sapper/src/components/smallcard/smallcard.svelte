<script>
  import Heading from "../heading/heading.svelte";
  export let number;
  export let title;
  export let link;
  export let icon;
  export let type = 1;
  export let bgColor = "#0a101b";
  export let iconColor = "#0dd6b8";
  export let nColor = "#fff";
  // export let moreInfo = true;
</script>

{#if type == 1}
  <div class="small-card">
    <div class="small-card-info">
      <div class="small-card-number">{number}</div>
      <div class="small-card-title">{title}</div>
      <div class="small-card-link">
        <a href={link}>Tümü</a>
      </div>
    </div>
    <div class="small-card-icon">
      <span class={icon} />
    </div>
  </div>
{/if}

{#if type == 2}
  <div class="small-card-modern" style="background-color: {bgColor};">
    <div class="small-card-modern-icon">
      <div class="small-card-mordern-icon-background" style="background: {iconColor};">
        <span class={icon} />
      </div>
    </div>
    <div class="small-card-modern-info">
      <div class="small-card-modern-info-number">
        <Heading fontSize="2em">{number}</Heading>
      </div>
      <div class="small-card-modern-info-title">
        <Heading fontSize="1.3em" fontWeight="600">{title}</Heading>
      </div>
    </div>
  </div>
{/if}

{#if type == 3}
  <div class="card" style="background: {bgColor};">
    <div class="card-content">
      <h3 style="color: {nColor}">{number}</h3>
      <p>{title}</p>
    </div>
  </div>
{/if}

<style lang="scss">
  .small-card {
    background-color: white;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 1em;
    font-weight: 800;
    border-radius: 1em;
    .small-card-number {
      font-size: 2em;
    }
    .small-card-title {
      color: gray;
    }
    .small-card-link {
      font-weight: 600;
      color: #2953e8;
    }
    .small-card-icon {
      color: #2953e8;
      font-size: 2.5em;
    }
  }

  //////////// Modern /////////////// - Type 1

  .small-card-modern {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    grid-gap: 1em;
    padding: 1.2em;
    color: white;
    border-radius: 1em;
    .small-card-modern-info {
      display: grid;
      grid-gap: 0.7em;
    }
    .small-card-mordern-icon-background {
      display: grid;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      height: 66px;
      width: 66px;
      font-size: 22px;
    }
  }

  /////////////////////////////////////////////// TYPE 3

  .card {
    display: grid;
    padding: 3em 2em;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 6px 10px -4px rgb(0 0 0 / 15%);
    .card-content {
      h3 {
        font-size: 3em;
        font-weight: 600;
        line-height: 1;
      }
      p {
        font-size: 19px;
        font-weight: 500;
        color: #fff;
        line-height: 1;
      }
    }
  }
</style>
