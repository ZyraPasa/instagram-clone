<script>
  import EditLayout from "../../../components/pages/edit/layout.svelte";
  import Inputs from "../../../components/input-new/input.svelte";
  import Button from "../../../components/button/button.svelte";
  import { validateSpace } from "../../../_lib/validationHelpers/validateSpace.js";
  import { validateMaxLength } from "../../../_lib/validationHelpers/validateMaxLength.js";
  import { validateMinLength } from "../../../_lib/validationHelpers/validateMinLength.js";
  import Backnotification from "../../../components/backnotification/backnotification.svelte";
  import { AlertStore } from "../../../stores/alert.js";
  import { goto, stores } from "@sapper/app";
  const { session } = stores();
  let inputStyle = {
    background: "none",
    padding: "0 10px",
    border: "1px solid #dbdbdb",
    "border-radius": "3px",
    width: "100%",
    height: "32px;",
    "font-weight": "500",
  };
  let formInputs = {
    oldPassword: {
      value: "",
      validate: false,
    },
    newPassword: {
      value: "",
      validate: false,
    },
    confirmPassword: {
      value: "",
      validate: false,
    },
  };
  let myProfile = {};
  let isOpenBackNotification = false;

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

  const openBackNotification = () => {
    const keys = Object.keys(formInputs);
    let activeError = [];
    keys.forEach((k) => {
      formInputs[k].value = formInputs[k].value.trim();
      if (!formInputs[k].validate) return activeError.push(k);
    });
    if (activeError.length) return showAlert("Lütfen bilgileri doğru doldurun!", "danger", "fas fa-times");
    if (formInputs.newPassword.value !== formInputs.confirmPassword.value)
      return showAlert("Yeni şifreler birbiri ile uyuşmuyor!", "danger", "fas fa-times");
    if (formInputs.newPassword.value === formInputs.oldPassword.value)
      return showAlert("Eski şifre ile yeni şifre aynı olamaz!", "danger", "fas fa-times");
    isOpenBackNotification = true;
  };

  const changePassword = async () => {
    const resultChangePassword = await fetch("http://localhost:5500/users/edit/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
      body: JSON.stringify({ inputs: formInputs }),
    });
    return await resultChangePassword.json();
  };

  const processChangePassword = async () => {
    isOpenBackNotification = false;
    const resultChange = await changePassword();
    if (!resultChange.status) return showAlert(resultChange.message, "danger", "fas fa-times");
    showAlert("Başarılı bir şekilde güncellendi!", "succes", "fas fa-check-circle");
    document.cookie = `token= `;
    await goto("/login");
  };
</script>

<svelte:head>
  <title>Şifre Değiştir • ZyraPasaa</title>
</svelte:head>

<Backnotification
  text="Şifre değiştirilecek, emin misin?"
  bind:isOpen={isOpenBackNotification}
  on:click={processChangePassword}
/>

<EditLayout bind:myProfile sagment="password">
  <div class="password">
    <div class="password-box">
      <ul>
        <li class="settings-row-image">
          <div class="settings-title-image">
            <div class="image-box">
              <img src={myProfile.avatar_url || "/photo/default-profile.png"} alt="profile" />
            </div>
          </div>
          <div class="settings-content">
            <span style="font-weight: bold;">{myProfile.username}</span>
          </div>
        </li>
        <li class="settings-row">
          <div class="settings-title">
            <div class="title">Eski Şifre</div>
          </div>
          <div class="settings-content">
            <Inputs
              bind:value={formInputs.oldPassword.value}
              bind:valid={formInputs.oldPassword.validate}
              validation={[
                new validateSpace(formInputs.oldPassword.value),
                new validateMaxLength(formInputs.oldPassword.value, "Eski Şifre", 21),
                new validateMinLength(formInputs.oldPassword.value, "Eski Şifre", 6),
              ]}
              settings={{ type: "password", placeholder: "Eski Şifre" }}
              style={inputStyle}
            />
          </div>
        </li>
        <div class="note">
          <p>
            Hesap güvenliği açısından şifrenizi 2. şahıs ile paylaşmayın. Hesap şifresi güvenliği size aittir, biz
            sorumlu değiliz.
          </p>
        </div>
        <li class="settings-row">
          <div class="settings-title">
            <div class="title">Yeni Şifre</div>
          </div>
          <div class="settings-content">
            <Inputs
              bind:value={formInputs.newPassword.value}
              bind:valid={formInputs.newPassword.validate}
              validation={[
                new validateSpace(formInputs.newPassword.value),
                new validateMaxLength(formInputs.newPassword.value, "Yeni Şifre", 21),
                new validateMinLength(formInputs.newPassword.value, "Yeni Şifre", 6),
              ]}
              settings={{ type: "password", placeholder: "Yeni Şifre" }}
              style={inputStyle}
            />
          </div>
        </li>
        <li class="settings-row">
          <div class="settings-title">
            <div class="title">Yeni Şifre(Tekrar)</div>
          </div>
          <div class="settings-content">
            <Inputs
              bind:value={formInputs.confirmPassword.value}
              bind:valid={formInputs.confirmPassword.validate}
              validation={[
                new validateSpace(formInputs.confirmPassword.value),
                new validateMaxLength(formInputs.confirmPassword.value, "Yeni Şifre(tekrar)", 21),
                new validateMinLength(formInputs.confirmPassword.value, "Yeni Şifre(tekrar)", 6),
              ]}
              settings={{ type: "password", placeholder: "Yeni Şifre Tekrar" }}
              style={inputStyle}
            />
          </div>
        </li>
      </ul>
      <div class="update-button">
        <Button text="Şifreyi Değiştir" color="blue" borderRadius="3px" on:click={openBackNotification} />
      </div>
    </div>
  </div>
</EditLayout>

<style lang="scss">
  @import "./_style.scss";
</style>
