import { userDatabase } from "./UserDatabase.js";
import { BcryptHelper } from "../../utils/BcryptHelper.js";

class UserModel {
  #User = {};
  // #id;
  // #username;
  // #password;
  // #email;
  // #admin_level;
  // #verified;
  // #avatar_url;
  // #biography;
  // #website;
  // #created;
  // #status;
  async #userSchema(key, value) {
    const userInfo = await userDatabase().getBy(key, value);
    if (!userInfo.data.length) return false;
    this.#User = userInfo.data[0];

    // this.#id = userInfo.data[0].id;
    // this.#username = userInfo.data[0].username;
    // this.#password = userInfo.data[0].password;
    // this.#email = userInfo.data[0].email;
    // this.#admin_level = userInfo.data[0].admin_level;
    // this.#verified = userInfo.data[0].verified;
    // this.#avatar_url = userInfo.data[0].avatar_url;
    // this.#biography = userInfo.data[0].biography;
    // this.#website = userInfo.data[0].website;
    // this.#created = userInfo.data[0].created;
    // this.#status = userInfo.data[0].status;
    return true;
  }
  async getAll() {
    return await userDatabase().getAll();
  }
  async getUserProfile(key, value) {
    const userStatus = await this.#userSchema(key, value);
    if (!userStatus) return { status: false, message: "Kullanıcı bulunamadı!" };
    return {
      status: true,
      message: "Başarılı bir şekilde profile getirildi!",
      data: {
        id: this.#User.id,
        username: this.#User.username,
        name: this.#User.name,
        admin_level: this.#User.admin_level,
        verified: this.#User.verified,
        avatar_url: this.#User.avatar_url,
        biography: this.#User.biography,
        website: this.#User.website,
      },
    };
  }
  async addUser(data) {
    const resultControlEmail = await this.#userSchema("email", data.email);
    if (resultControlEmail) return { status: false, message: "Bu email kullanımda!" };
    const resultControlUsername = await this.#userSchema("username", data.username);
    if (resultControlUsername) return { status: false, message: "Bu kullanıcı adı kullanımda!" };
    const bcrypt = new BcryptHelper();
    data.password = await bcrypt.encrypt(data.password);
    this.#User = {
      email: data.email,
      name: data.name,
      username: data.username,
      password: data.password,
    };
    return await userDatabase().addUser(this.#User);
  }
  async controlUser(data) {
    const resultControlUsername = await this.#userSchema("username", data.username);
    if (!resultControlUsername) return { status: false, message: "Böyle bir hesap bulunamadı!" };
    const bcrypt = new BcryptHelper();
    const validatePassword = await bcrypt.decrypt(data.password, this.#User.password);
    if (!validatePassword) return { status: false, message: "Hatalı şifre girişi!" };
    return { status: true, message: "Hesap doğrulandı!", userId: this.#User.id };
  }
  async editUserProfile(data, accountId) {
    const resultControlUsername = await this.#userSchema("username", data.username);
    if (resultControlUsername) return { status: false, message: "Bu kullanıcı adı kullanımda!" };
    this.#User = data;
    const resultUpdate = await userDatabase().updateUser("id", accountId, this.#User);
    if (!resultUpdate.status) return resultUpdate;
    if (!resultUpdate.info.changedRows) return { status: false, message: "En az 1 değeri değiştirmelisiniz!" };
    return { status: true, message: "Başarılı bir şekilde güncellendi!" };
  }
  async changePassword(data, accountId) {
    const resultGetUser = await this.#userSchema("id", accountId);
    if (!resultGetUser) return { status: false, message: "Belirtilen hesaba ulaşılamadı!" };
    const bcrypt = new BcryptHelper();
    const validateOldPassword = await bcrypt.decrypt(data.oldPassword, this.#User.password);
    if (!validateOldPassword) return { status: false, message: "Hatalı Eski Şifre girdiniz!" };
    //her şey okey
    const bcryptNewPassword = await bcrypt.encrypt(data.newPassword);
    return await this.editUserProfile({ password: bcryptNewPassword }, accountId);
  }
  async searchUser(value) {
    return userDatabase().searchUser(value);
  }
  async changeAvatar(accountId, avatarName) {
    const resultChangeAvatar = await userDatabase().updateProfileAvatar("id", accountId, {
      avatar_url: `http://localhost:5500/${avatarName}.png`,
    });
  }
}

let instance;

export const userModel = () => {
  if (!instance) {
    return new UserModel();
  }
  return instance;
};
