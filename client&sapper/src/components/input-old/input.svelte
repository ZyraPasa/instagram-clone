<script>
  import {
    validateSpace,
    validateEmail,
    validateNumber,
    validateMinValue,
    validateMaxValue,
  } from "../../_lib/helpers/validationHelper.js";
  export let settings = {};
  export let selectorData = [];

  export let value = "";
  export let valid = false;
  export let message = "";
  export let width = "100%";
  export let inputBackground = "#1e1e2d";
  export let color = "white";
  export let border = "1px solid lightgray";
  export let borderBottom = "1px solid #ececec";

  let inputSettings = {
    type: "text",
    name: "custom-input",
    tag: "Tag Name",
    required: true,
    placeholder: undefined,
    disabled: false,
    label: undefined,
    showError: true,
    max: undefined,
    min: undefined,
    maxNumber: undefined,
    minNumber: undefined,
    spaceControl: false,
    rows: undefined,
    cols: undefined,
    resize: "",
    ...settings,
  };

  let id = `${inputSettings.name}-${Math.floor(Math.random() * 100000)}`;

  const valueControl = () => {
    if (inputSettings.required) {
      // Kontrol edilecekse
      if (inputSettings.max && value.length > inputSettings.max) {
        message = `${inputSettings.tag} en fazla ${inputSettings.max} karakter olabilir!`;
        valid = false;
      } else if (inputSettings.min && value.length < inputSettings.min) {
        message = `${inputSettings.tag} en az ${inputSettings.min} karakter olmalı!`;
        valid = false;
      } else if (inputSettings.spaceControl && !validateSpace(value)) {
        message = `${inputSettings.tag} üzerinde boşluk kullanılamaz!`;
        valid = false;
      } else if (inputSettings.type === "email" && !validateEmail(value)) {
        removeSpace();
        message = "Geçersiz bir email adresi girdiniz!";
        valid = false;
      } else if (inputSettings.type === "number" && !validateNumber(value)) {
        message = "Geçerisiz sayı girişi! Lütfen sayı girin!";
        valid = false;
      } else if (
        inputSettings.type === "number" &&
        inputSettings.maxNumber &&
        !validateMaxValue(value, inputSettings.maxNumber)
      ) {
        message = `${inputSettings.tag} en fazla ${inputSettings.maxNumber} olabilir!`;
        valid = false;
      } else if (
        inputSettings.type === "number" &&
        inputSettings.minNumber &&
        !validateMinValue(value, inputSettings.minNumber)
      ) {
        message = `${inputSettings.tag} en az ${inputSettings.minNumber} olmalıdır!`;
        valid = false;
      } else {
        valid = true;
        message = "";
      }
    } else {
      valid = true;
      message = "";
    }
  };

  const removeSpace = () => (value = value.replace(/ /g, ""));

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
      class:disabled={inputSettings.disabled}
      style="width: {width}; background: {inputBackground}; color: {color}; border: {border}; border-bottom: {borderBottom};"
      name={inputSettings.name}
      placeholder={inputSettings.placeholder}
      disabled={inputSettings.disabled}
      bind:value
    />
  {/if}

  {#if inputSettings.type === "password"}
    <input
      {id}
      type="password"
      class="input"
      class:disabled={inputSettings.disabled}
      style="width: {width}; background: {inputBackground}; color: {color}; border: {border}; border-bottom: {borderBottom};"
      name={inputSettings.name}
      placeholder={inputSettings.placeholder}
      disabled={inputSettings.disabled}
      bind:value
    />
  {/if}

  {#if inputSettings.type === "number"}
    <input
      {id}
      type="text"
      class="input"
      class:disabled={inputSettings.disabled}
      style="width: {width}; background: {inputBackground}; color: {color}; border: {border}; border-bottom: {borderBottom};"
      name={inputSettings.name}
      placeholder={inputSettings.placeholder}
      disabled={inputSettings.disabled}
      bind:value
    />
  {/if}

  {#if inputSettings.type === "email"}
    <input
      {id}
      type="email"
      class="input"
      class:disabled={inputSettings.disabled}
      style="width: {width}; background: {inputBackground}; color: {color}; border: {border}; border-bottom: {borderBottom};"
      name={inputSettings.name}
      placeholder={inputSettings.placeholder}
      disabled={inputSettings.disabled}
      bind:value
    />
  {/if}

  {#if inputSettings.type === "textarea"}
    <div class="input-textarea">
      <textarea
        {id}
        class="input"
        class:disabled={inputSettings.disabled}
        name={inputSettings.name}
        rows={inputSettings.rows}
        placeholder={inputSettings.placeholder}
        cols={inputSettings.cols}
        disabled={inputSettings.disabled}
        style="resize: {inputSettings.resize}; width: {width}; background: {inputBackground}; color: {color}; border: {border}; border-bottom: {borderBottom};"
        bind:value
      />
    </div>
  {/if}

  {#if inputSettings.type === "selector"}
    <select {id} bind:value style="width: {width}; background: none; border: 1px solid lightgray; color: lightgray;">
      {#each selectorData as options}
        <option value={options.value} style="color: black;">{options.title}</option>
      {/each}
    </select>
  {/if}

  {#if message && inputSettings.showError}
    <div class="error">{message}</div>
  {/if}
</div>

<style lang="scss">
  .input-wrapper {
    .label {
      margin-bottom: 5px;
      padding-left: 5px;
    }
    .input {
      padding: 1em 0.5em 10px;

      color: #101010;
      line-height: 1.75em;
      font-size: 15px;
      &:focus {
        border-bottom: 2px solid gray;
        &::placeholder {
          opacity: 0;
        }
      }

      border-radius: 10px;
    }
  }
  select {
    font-size: 1em;
    padding: 0.5em;
  }
  .input::placeholder {
    color: lightgray;
    padding-left: 5px;
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }
  .disabled {
    cursor: no-drop;
  }
  .error {
    color: red;
  }
</style>
