<script>
  import Input from "../../components/input-new/input.svelte";
  import Button from "../../components/button/button.svelte";
  import { validateSpace } from "../../_lib/validationHelpers/validateSpace.js";
  import { validateMinLength } from "../../_lib/validationHelpers/validateMinLength.js";
  import { validateMaxLength } from "../../_lib/validationHelpers/validateMaxLength.js";
  import { validateEmail } from "../../_lib/validationHelpers/validateEmail.js";
  import { AlertStore } from "../../stores/alert.js";
  import { goto, stores } from "@sapper/app";
  const { session } = stores();
  let inputStyle = {
    "background-color": "#fafafa",
    padding: "9px 0 7px 8px",
    border: "1px solid #dbdbdb",
    width: "100%",
  };
  let formInputs = {
    email: {
      value: "",
      validate: false,
    },
    name: {
      value: "",
      validate: false,
    },
    nick: {
      value: "",
      validate: false,
    },
    password: {
      value: "",
      validate: false,
    },
    password_confirm: {
      value: "",
      validate: false,
    },
  };

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

  const registerAccount = async () => {
    const resultRegisterAccount = await fetch("http://localhost:5500/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: formInputs }),
    });
    return await resultRegisterAccount.json();
  };

  const processRegister = async () => {
    const keys = Object.keys(formInputs);
    let activeError = [];
    keys.forEach((k) => {
      formInputs[k].value = formInputs[k].value.trim();
      if (!formInputs[k].validate) activeError.push(k);
    });
    if (activeError.length) return showAlert("Bilgileri doğru doldurun!", "danger", "fas fa-times");
    if (formInputs.password.value !== formInputs.password_confirm.value)
      return showAlert("Şifreler birbiri ile uyuşmuyor!", "danger", "fas fa-times");
    const resultRegister = await registerAccount();
    if (!resultRegister.status) return showAlert(resultRegister.message, "danger", "fas fa-times");
    document.cookie = `token=${resultRegister.token}`;
    $session.jwtKey = resultRegister.token;
    $session.userId = resultRegister.userId;
    await goto("/");
  };
</script>

<svelte:head>
  <title>Kayıt Ol • ZyraPasaa</title>
</svelte:head>

<div class="register">
  <div class="register-box">
    <div class="register-box-header">
      <h2>ZyraPasaa</h2>
      <h3>Arkadaşlarının fotoğraf ve videolarını görmek için kaydol.</h3>
    </div>
    <div class="register-box-body">
      <form>
        <Input
          bind:value={formInputs.email.value}
          bind:valid={formInputs.email.validate}
          validation={[
            new validateEmail(formInputs.email.value),
            new validateMaxLength(formInputs.email.value, "Email", 128),
          ]}
          settings={{ type: "text", placeholder: "E-posta" }}
          style={inputStyle}
        />
        <Input
          bind:value={formInputs.name.value}
          bind:valid={formInputs.name.validate}
          validation={[
            new validateMaxLength(formInputs.name.value, "Isim/Soyisim", 64),
            new validateMinLength(formInputs.name.value, "Isim/Soyisim", 3),
          ]}
          settings={{ type: "text", placeholder: "Adı Soyadı" }}
          style={inputStyle}
        />
        <Input
          bind:value={formInputs.nick.value}
          bind:valid={formInputs.nick.validate}
          validation={[
            new validateSpace(formInputs.nick.value, "Kullanıcı Adı"),
            new validateMinLength(formInputs.nick.value, "Kullanıcı Adı", 3),
            new validateMaxLength(formInputs.nick.value, "Kullanıcı Adı", 16),
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
        <Input
          bind:value={formInputs.password_confirm.value}
          bind:valid={formInputs.password_confirm.validate}
          validation={[
            new validateSpace(formInputs.password_confirm.value, "Şifre(tekrar)"),
            new validateMinLength(formInputs.password_confirm.value, "Şifre(tekrar)", 6),
            new validateMaxLength(formInputs.password_confirm.value, "Şifre(tekrar)", 21),
          ]}
          settings={{ type: "password", placeholder: "Şifre(tekrar)" }}
          style={inputStyle}
        />
        <Button text="Kaydol" color="blue" type="submit" borderRadius="3px" on:click={processRegister} />
      </form>
      <div class="register-box-body-info">
        <span>
          Kaydolarak, <a href="/">Koşullar'ı</a>, <a href="/">Veri İlkesi'ni</a> ve <a href="/">Çerezler İlkesi'ni</a> kabul
          etmiş olursun.
        </span>
      </div>
      <div class="login">
        <span>Zaten bir hesabın var mı?</span> <a href="/login">Giriş Yap</a>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "./_style.scss";
</style>
