<script>
  import Input from "../../components/input-new/input.svelte";
  import Button from "../../components/button/button.svelte";
  import { validateSpace } from "../../_lib/validationHelpers/validateSpace.js";
  import { validateMinLength } from "../../_lib/validationHelpers/validateMinLength.js";
  import { validateMaxLength } from "../../_lib/validationHelpers/validateMaxLength.js";
  import { AlertStore } from "../../stores/alert.js";
  import { goto, stores } from "@sapper/app";
  const { session } = stores();
  const showAlert = (text, type, icon) => {
    if (!$AlertStore.isOpen) {
      $AlertStore.text = text;
      $AlertStore.type = type;
      $AlertStore.icon = icon;
      $AlertStore.isOpen = true;
      setTimeout(function () {
        $AlertStore.isOpen = false;
      }, 5000);
    }
  };
  let inputStyle = {
    "background-color": "#fafafa",
    padding: "9px 0 7px 8px",
    border: "1px solid #dbdbdb",
    width: "100%",
  };
  let formInputs = {
    username: {
      value: "",
      validate: false,
    },
    password: {
      value: "",
      validate: false,
    },
  };

  const loginAccount = async () => {
    const resultLoginAccount = await fetch("http://localhost:5500/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: formInputs }),
    });
    return await resultLoginAccount.json();
  };

  const processLogin = async () => {
    const keys = Object.keys(formInputs);
    let activeError = [];
    keys.forEach((k) => {
      formInputs[k].value = formInputs[k].value.trim();
      if (!formInputs[k].validate) activeError.push(k);
    });
    if (activeError.length) return showAlert("Bilgileri doğru doldurun!", "danger", "fas fa-times");
    const resultLogin = await loginAccount();
    if (!resultLogin.status) return showAlert(resultLogin.message, "danger", "fas fa-times");
    document.cookie = `token=${resultLogin.token}`;
    $session.jwtKey = resultLogin.token;
    $session.userId = resultLogin.userId;
    await goto("/");
  };
</script>

<svelte:head>
  <title>Giriş Yap • ZyraPasaa</title>
</svelte:head>

<div class="login">
  <div class="login-box">
    <div class="login-box-header">
      <h2>ZyraPasaa</h2>
      <h3>Kaldığın yerden hemen devam et!</h3>
    </div>
    <div class="login-box-body">
      <form>
        <Input
          bind:value={formInputs.username.value}
          bind:valid={formInputs.username.validate}
          validation={[
            new validateSpace(formInputs.username.value, "Kullanıcı Adı"),
            new validateMinLength(formInputs.username.value, "Kullanıcı Adı", 3),
            new validateMaxLength(formInputs.username.value, "Kullanıcı Adı", 16),
          ]}
          settings={{ type: "text", placeholder: "Kullanıcı Adı" }}
          style={inputStyle}
        />
        <Input
          bind:value={formInputs.password.value}
          bind:valid={formInputs.password.validate}
          validation={[
            new validateSpace(formInputs.password.value, "Şifre"),
            new validateMinLength(formInputs.password.value, "Şifre", 6),
            new validateMaxLength(formInputs.password.value, "Şifre", 21),
          ]}
          settings={{ type: "password", placeholder: "Şifre" }}
          style={inputStyle}
        />
        <Button text="Giriş Yap" color="blue" type="submit" on:click={processLogin} />
      </form>
      <div class="login-box-body-info">
        <span>
          Şifreni mi unuttun? <a href="/">Buraya</a> tıklamanız yeter.
        </span>
      </div>
      <div class="register">
        <span>Bir hesaba sahip değil misin? Hemen</span> <a href="/register">Kayıt Ol</a>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "./_style.scss";
</style>
