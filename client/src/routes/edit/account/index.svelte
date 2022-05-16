<script>
  import EditLayout from "../../../components/pages/edit/layout.svelte";
  import Inputs from "../../../components/input-new/input.svelte";
  import Button from "../../../components/button/button.svelte";
  import { validateMaxLength } from "../../../_lib/validationHelpers/validateMaxLength.js";
  import { validateMinLength } from "../../../_lib/validationHelpers/validateMinLength.js";
  import { validateSpace } from "../../../_lib/validationHelpers/validateSpace.js";
  import Backnotification from "../../../components/backnotification/backnotification.svelte";
  import { AlertStore } from "../../../stores/alert.js";
  import { onMount } from "svelte";
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
  let myProfile = {};
  let formInputs = {
    name: {
      value: "",
      validate: false,
    },
    username: {
      value: "",
      validate: false,
    },
    website: {
      value: "",
      validate: true,
    },
    biography: {
      value: "",
      validate: true,
    },
  };
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

  const getMyProfile = async () => {
    const resultMyProfile = await fetch(`http://localhost:5500/users/profile/${$session.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
    });
    const result = await resultMyProfile.json();
    if (!result.status) return showAlert(result.message, "danger", "fas fa-times");
    formInputs.name.value = result.data.name;
    formInputs.username.value = result.data.username;
    formInputs.website.value = result.data.website;
    formInputs.biography.value = result.data.biography;
  };
  onMount(async () => {
    await getMyProfile();
  });

  const updateProfile = async () => {
    const resultUpdateProfile = await fetch("http://localhost:5500/users/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
      body: JSON.stringify({ inputs: formInputs }),
    });
    return await resultUpdateProfile.json();
  };

  const openBackNotification = async () => {
    const keys = Object.keys(formInputs);
    let activeError = [];
    keys.forEach((k) => {
      formInputs[k].value = formInputs[k].value.trim();
      if (!formInputs[k].validate) return activeError.push(k);
    });
    if (activeError.length) return showAlert("Lütfen bilgileri doğru doldurun!", "danger", "fas fa-times");
    isOpenBackNotification = true;
  };

  const processUpdateProfile = async () => {
    isOpenBackNotification = false;
    const resultUpdate = await updateProfile();
    if (!resultUpdate.status) return showAlert(resultUpdate.message, "danger", "fas fa-times");
    await getMyProfile();
    showAlert("Başarılı bir şekilde güncellendi!", "succes", "fas fa-check-circle");
  };
</script>

<svelte:head>
  <title>Hesap Ayarları • ZyraPasaa</title>
</svelte:head>

<Backnotification
  text="Yeni bilgiler kayıt edilecek. Emin misin?"
  bind:isOpen={isOpenBackNotification}
  on:click={processUpdateProfile}
/>

<EditLayout bind:myProfile sagment="account">
  <div class="account">
    <div class="account-box">
      <ul>
        <li class="settings-row-image">
          <div class="settings-title-image">
            <div class="image-box">
              <img src={myProfile.avatar_url || "/photo/default-profile.png"} alt="profile" />
            </div>
          </div>
          <div class="settings-content">
            <span style="font-weight: bold;">
              {myProfile.username || "Yükleniyor..."}
            </span>
          </div>
        </li>
        <li class="settings-row">
          <div class="settings-title">
            <div class="title">Adın</div>
          </div>
          <div class="settings-content">
            <Inputs
              bind:value={formInputs.name.value}
              bind:valid={formInputs.name.validate}
              validation={[
                new validateMaxLength(formInputs.name.value, "Isim/Soyisim", 64),
                new validateMinLength(formInputs.name.value, "Isim/Soyisim", 3),
              ]}
              settings={{ type: "text", placeholder: "Adın..." }}
              style={inputStyle}
            />
          </div>
        </li>
        <div class="note">
          <p>
            Adın ve soyadın, takma adın veya işletmenin adı gibi tanındığın bir adı kullanarak insanların hesabını
            tanımasına yardımcı ol.
          </p>
        </div>
        <li class="settings-row">
          <div class="settings-title">
            <div class="title">Kullanıcı Adı</div>
          </div>
          <div class="settings-content">
            <Inputs
              bind:value={formInputs.username.value}
              bind:valid={formInputs.username.validate}
              settings={{ type: "text", placeholder: "Kullanıcı Adı..." }}
              style={inputStyle}
            />
          </div>
        </li>
        <div class="note">
          <p>Kullanıcı adını değiştiremezsiniz.</p>
        </div>
        <li class="settings-row">
          <div class="settings-title">
            <div class="title">İnternet Sitesi</div>
          </div>
          <div class="settings-content">
            <Inputs
              bind:value={formInputs.website.value}
              settings={{ type: "text", placeholder: "Website..." }}
              style={inputStyle}
            />
          </div>
        </li>
        <li class="settings-row">
          <div class="settings-title">
            <div class="title" style="padding-bottom: 1em">Biyografi</div>
          </div>
          <div class="settings-content">
            <Inputs
              bind:value={formInputs.biography.value}
              settings={{ type: "textarea", placeholder: "Biyografi...", rows: 4 }}
              style={{ ...inputStyle, height: "none", "padding-top": "1em", resize: "vertical" }}
            />
          </div>
        </li>
      </ul>
      <div class="update-button">
        <Button text="Gönder" color="blue" borderRadius="3px" on:click={openBackNotification} />
      </div>
    </div>
  </div>
</EditLayout>

<style lang="scss">
  @import "./_style.scss";
</style>
