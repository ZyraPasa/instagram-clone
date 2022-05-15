<script>
  import { returnedWrapperHelper } from "../../_lib/helpers/wrapperHelper";
  import { validations } from "../../_lib/validationHelpers/validations";
  export let settings = {};
  export let value = "";
  export let valid = false;
  export let error = "";
  export let style = {};
  export let validation = [];
  let inputSettings = {
    type: "text",
    name: "custom-input",
    tag: "",
    required: true,
    placeholder: undefined,
    disabled: false,
    label: undefined,
    showError: true,
    rows: undefined,
    cols: undefined,
    resize: "",
    ...settings,
  };
  const id = `${inputSettings.name}-${Math.floor(Math.random() * 100000)}`;

  const valueControl = () => {
    if (!value) {
      error = "";
      valid = false;
      return;
    }
    if (inputSettings.required && validation.length) {
      const resultValidate = new validations(validation);
      const resultValidations = resultValidate.resultValidations();
      if (resultValidations.length) {
        valid = false;
        error = resultValidations[0];
      } else {
        valid = true;
        error = "";
      }
    } else {
      valid = true;
    }
  };

  $: {
    valueControl(value);
  }
</script>

<div class="input-wrapper">
  {#if inputSettings.label}
    <div class="label">
      <label for={id}>{inputSettings.label}</label>
    </div>
  {/if}
  {#if inputSettings.type === "text"}
    <input
      {id}
      type="text"
      class="input"
      style={returnedWrapperHelper(style)}
      class:disabled={inputSettings.disabled}
      name={inputSettings.name}
      placeholder={inputSettings.placeholder}
      disabled={inputSettings.disabled}
      bind:value
      on:focus
      on:focusout
      on:click
      on:keypress
      on:keyup
    />
  {/if}
  {#if inputSettings.type === "password"}
    <input
      {id}
      type="password"
      class="input"
      style={returnedWrapperHelper(style)}
      class:disabled={inputSettings.disabled}
      name={inputSettings.name}
      placeholder={inputSettings.placeholder}
      disabled={inputSettings.disabled}
      bind:value
      on:focus
      on:focusout
      on:click
      on:keypress
    />
  {/if}
  {#if inputSettings.type === "textarea"}
    <div class="input-textarea">
      <textarea
        {id}
        class="input"
        class:disabled={inputSettings.disabled}
        name={inputSettings.name}
        style={returnedWrapperHelper(style)}
        rows={inputSettings.rows}
        placeholder={inputSettings.placeholder}
        cols={inputSettings.cols}
        disabled={inputSettings.disabled}
        bind:value
        on:focus
        on:focusout
        on:click
        on:keypress
      />
    </div>
  {/if}
  {#if inputSettings.showError}
    <div class="error">
      {error}
    </div>
  {/if}
</div>

<style lang="scss">
  .error {
    color: red;
    font-size: 12px;
  }
</style>
