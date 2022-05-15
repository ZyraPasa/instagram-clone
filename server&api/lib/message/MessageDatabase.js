import { BaseDatabase } from "../base/BaseDatabase.js";
import { databaseConnection } from "../../utils/mysql.js";
const db = databaseConnection();

class MessageDatabase extends BaseDatabase {
  constructor() {
    super(db, "messages");
  }
  async getAccountSenderAllMessages(accountId) {
    return await this.selectBy("sender_id", accountId)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde tablolar getirildi!", data: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async getAccountReceiverAllMessages(accountId) {
    return await this.selectBy("receiver_id", accountId)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde tablolar getirildi!", data: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async getMessageBoxList(accountId) {
    return await this.customSql(
      `SELECT id, username, avatar_url, (SELECT message_content FROM messages WHERE (sender_id = ${accountId} AND receiver_id = accounts.id) OR (sender_id = accounts.id AND receiver_id = ${accountId}) ORDER BY messages.id DESC LIMIT 1) AS last_message, (SELECT send_date FROM messages WHERE (sender_id = ${accountId} AND receiver_id = accounts.id) OR (sender_id = accounts.id AND receiver_id = ${accountId}) ORDER BY messages.id DESC LIMIT 1) AS send_date, (SELECT sender_id FROM messages WHERE (sender_id = ${accountId} AND receiver_id = accounts.id) OR (sender_id = accounts.id AND receiver_id = ${accountId}) ORDER BY messages.id DESC LIMIT 1) AS last_message_sender_id FROM accounts WHERE id IN (SELECT receiver_id AS account FROM messages WHERE sender_id = ${accountId} UNION SELECT sender_id AS account FROM messages WHERE receiver_id = ${accountId}) ORDER BY send_date DESC;`
    )
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde mesaj kutusu getirildi!", data: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async getDirectMessages(accountId, targetAccountId, activeMessageCount) {
    return await this.customSql(
      `SELECT * FROM ( SELECT * FROM messages WHERE (sender_id = ${accountId} AND receiver_id = ${targetAccountId}) OR (sender_id = ${targetAccountId} AND receiver_id = ${accountId}) ORDER BY id DESC LIMIT ${activeMessageCount}, 15 ) sub ORDER BY id ASC`
    )
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde mesajlar getirildi!", data: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async newMessage(data) {
    return await this.insertInto(data)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde mesaj kayıt edildi!", detail: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async viewAllDirectMessage(accountId, targetAccountId) {
    return await this.customSql(`UPDATE messages SET message_view = 1 WHERE receiver_id = ? AND sender_id = ?;`, [
      accountId,
      targetAccountId,
    ])
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde tüm mesajlar görüldü!", detail: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
}

let instance;
export const messageDatabase = () => {
  if (instance) return instance;
  instance = new MessageDatabase();
  return instance;
};
