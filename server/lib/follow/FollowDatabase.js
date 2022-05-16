import { BaseDatabase } from "../base/BaseDatabase.js";
import { databaseConnection } from "../../utils/mysql.js";
const db = databaseConnection();

class FollowDatabase extends BaseDatabase {
  constructor() {
    super(db, "account_follows");
  }
  async getByMultiple(data) {
    return await this.selectByMultiple(data)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde tablolar getirildi!", data: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu" };
      });
  }
  async addFollow(options) {
    return await this.insertInto(options)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde takip edildi!", detail: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async removeFollow(options) {
    return await this.deleteByMultiple(options)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde takip etme kaldırıldı!", detail: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async getFollowerCount(accountId) {
    return await this.selectTableCountBy("follow_account_id", accountId)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde takipçi sayısı getirildi!", count: result[0].count };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async getFollowCount(accountId) {
    return await this.selectTableCountBy("account_id", accountId)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde takip sayısı getirildi!", count: result[0].count };
      })
      .catch((error) => {
        console.log(error);
        return { status: fasle, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
}

let instance;

export const followDatabase = () => {
  if (instance) return instance;
  instance = new FollowDatabase();
  return instance;
};
