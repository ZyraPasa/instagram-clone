<script>
  export let text = "Button";
  export let color = "default";
  export let size = "default";
  export let borderRadius = "0px";
  export let height = "";
  export let width = "";
  export let disabled = false;
  export let type = "button";
</script>

<button
  {type}
  class="button {color} {size}"
  class:disabled
  style="border-radius: {borderRadius}; height: {height}; width: {width}"
  on:click|preventDefault
>
  {@html text}
</button>

<style lang="scss">
  .button {
    font-size: 1em;
    cursor: pointer;
    border: 1px solid transparent;
    font-weight: 400;
    text-align: center;
    line-height: 1.25;
    transition: all 0.5s ease-in-out;
    color: white;
  }
  .disabled {
    display: none;
  }
  ///////////////// DEFAULT /////////////////
  .default {
    padding: 5px 9px;
    background-color: transparent;
    color: black;
    border-color: #dbdbdb;
    &:hover {
      background-color: transparent;
    }
  }
  ///////////////// COLORS /////////////////
  .white {
    background-color: #fff;
    color: #444;
    border-color: #ddd;
    &:hover {
      background-color: #e7e7e7;
    }
  }
  .lightblue {
    background-color: #389af0;
    border-color: #367fa9;
    &:hover {
      background-color: #367fa9;
    }
  }
  .blue {
    font-size: 14px;
    background-color: #0095f6;
    color: #fff;
    font-weight: 600;
    border-color: #0095f6;
    &:hover {
      background-color: #0095f6;
    }
  }
  .red {
    background-color: #fc4b6c;
    border-color: #e03656;
    color: #fff;
    &:hover {
      background-color: #e03656;
    }
  }
  .yellow {
    background-color: #ffb22b;
    color: #444;
    border-color: #e08e0b;
    &:hover {
      background-color: #e08e0b;
    }
  }
  .green {
    background-color: #7dab2e;
    border-color: #6b9620;
    color: #fff;
    &:hover {
      background-color: #6b9620;
    }
  }
  .purple {
    background-color: #7460ee;
    border-color: #5949c5;
    &:hover {
      background-color: #5949c5;
    }
  }
  .navy {
    background-color: #001f3f;
    border-color: #02172c;
    &:hover {
      background-color: #02172c;
    }
  }
  .black {
    background-color: #101010;
    border-color: rgb(5, 5, 5);
    &:hover {
      background-color: rgb(5, 5, 5);
    }
  }
  .none {
    background: transparent;
    border-color: transparent;
    color: #0095f6;
    font-weight: bold;
    &:hover {
      background-color: transparent;
    }
  }
  ///////////////// SIZES /////////////////
  .small {
    padding: 4px 8px;
  }
  .big {
    padding: 12px 16px;
  }
  .custom {
    padding: 0 24px;
  }
</style>
