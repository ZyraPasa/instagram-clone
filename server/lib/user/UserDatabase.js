import { BaseDatabase } from "../base/BaseDatabase.js";
import { databaseConnection } from "../../utils/mysql.js";
import { response } from "../../utils/response.js";
const db = databaseConnection();

class UserDatabase extends BaseDatabase {
  constructor() {
    super(db, "accounts");
  }
  async getAll() {
    return await this.selectAll()
      .then((result) => {
        return response(true, "Başarılı bir şekilde tüm hesaplar getirildi!", result);
      })
      .catch((error) => {
        console.log(error);
        return response(false, "Bilinmeyen bir hata oluştu");
      });
  }
  async getBy(key, value) {
    return await this.selectBy(key, value)
      .then((result) => {
        return response(true, "Başarılı bir şekilde hesap getirildi!", result);
      })
      .catch((error) => {
        console.log(error);
        return response(false, "Bilinmeyen bir hata oluştu");
      });
  }
  async getUserProfile(userId, selects) {
    return await this.selectByFilter("id", userId, selects)
      .then((result) => {
        return response(true, "Başarılı bir şekilde profil detayları getirildi", result[0]);
      })
      .catch((error) => {
        console.log(error);
        return response(false, "Bilinmeyen bir hata oluştu");
      });
  }
  async addUser(options) {
    return await this.insertInto(options)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde yeni user kayıt edildi!", info: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async updateUser(key, value, data) {
    return await this.updateBy(key, value, data)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde kullanıcı güncellendi!", info: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async searchUser(value) {
    return await this.customSql(
      `SELECT id, username, avatar_url, name, verified FROM accounts WHERE username LIKE ? OR name LIKE ? ORDER BY RAND() LIMIT 15;`,
      [`%${value}%`, `%${value}%`]
    )
      .then((result) => {
        return { status: true, message: "Beşarılı bir şekilde userlar getirildi!", data: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async updateProfileAvatar(key, value, data) {
    return await this.updateBy(key, value, data)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde avatar güncellendi!", detail: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
}

let instance;

export const userDatabase = () => {
  if (!instance) {
    return new UserDatabase();
  }
  return instance;
};
