import { messageModel } from "./MessageModel.js";
import TypeCheck from "../../utils/typeCheck.js";

class MessageServices {
  async getMessageBoxList(accountId) {
    if (!accountId) return { status: false, message: "Geçerli bir account id girin!" };
    return await messageModel().getMessageBoxList(accountId);
  }
  async getDirectMessages(data) {
    const type = new TypeCheck();
    if (!type.isObject(data)) return { status: false, message: "Lütfen obje girin!" };
    return await messageModel().getDirectMessages(data.accountId, data.targetAccountId, data.activeMessageCount);
  }
  async newMessage(data) {
    const type = new TypeCheck();
    if (!type.isObject(data)) return { status: false, message: "Lütfen obje girin!" };
    return await messageModel().newMessage(data.accountId, data.targetAccountId, data.message);
  }
  viewAllDirectMessage(data) {
    return messageModel().viewAllDirectMessage(data.accountId, data.targetAccountId);
  }
}

let instance;
export const messageServices = () => {
  if (instance) return instance;
  instance = new MessageServices();
  return instance;
};
