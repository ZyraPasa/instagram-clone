import { messageDatabase } from "./MessageDatabase.js";

class MessageModel {
  #Messages = {};
  async getMessageBoxList(accountId) {
    const resultMessageBoxList = await messageDatabase().getMessageBoxList(accountId);
    if (!resultMessageBoxList.status) return resultMessageBoxList;
    if (!resultMessageBoxList.data.length) return { status: false, message: "Geçmişte kimse ile konuşmamışsın!" };
    return resultMessageBoxList;
  }
  async getDirectMessages(accountId, targetAccountId, activeMessageCount) {
    messageDatabase().viewAllDirectMessage(accountId, targetAccountId);
    return await messageDatabase().getDirectMessages(accountId, targetAccountId, activeMessageCount);
  }
  async newMessage(accountId, targetAccountId, message) {
    return await messageDatabase().newMessage({
      sender_id: accountId,
      receiver_id: targetAccountId,
      message_content: message,
    });
  }
  viewAllDirectMessage(accountId, targetAccountId) {
    return messageDatabase().viewAllDirectMessage(accountId, targetAccountId);
  }
}

let instance;
export const messageModel = () => {
  if (instance) return instance;
  instance = new MessageModel();
  return instance;
};
