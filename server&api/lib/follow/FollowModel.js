import { followDatabase } from "./FollowDatabase.js";

class FollowModel {
  #Follow = {};
  async #followSchema(accountId, targetAccountId) {
    const followInfo = await followDatabase().getByMultiple({
      account_id: accountId,
      follow_account_id: targetAccountId,
    });
    if (!followInfo.data.length) return false;
    this.#Follow = followInfo.data[0];
    return true;
  }
  async fallowAccount(accountId, targetAccountId) {
    if (accountId == targetAccountId) return { status: false, message: "Kendinizi takip edemezsiniz!" };
    const resultFollowControl = await this.#followSchema(accountId, targetAccountId);
    if (resultFollowControl) return { status: false, message: "Zaten bu kullanıcıyı takip ediyorsunuz!" };
    this.#Follow = {};
    this.#Follow.account_id = accountId;
    this.#Follow.follow_account_id = targetAccountId;
    return await followDatabase().addFollow(this.#Follow);
  }
  async unfollowAccount(accountId, targetAccountId) {
    if (accountId == targetAccountId) return { status: false, message: "Kendi üzerinizde işlem uygulayamazsınız!" };
    const resultFollowControl = await this.#followSchema(accountId, targetAccountId);
    if (!resultFollowControl) return { status: false, message: "Bu kullanıcıyı takip etmiyorsunuz!" };
    this.#Follow.account_id = accountId;
    this.#Follow.follow_account_id = targetAccountId;
    return await followDatabase().removeFollow(this.#Follow);
  }
  async followControl(accountId, targetAccountId) {
    return await this.#followSchema(accountId, targetAccountId);
  }
  async getFollower(accountId) {
    return await followDatabase().getFollowerCount(accountId);
  }
  async getFollow(accountId) {
    return await followDatabase().getFollowCount(accountId);
  }
}

let instance;

export const followModel = () => {
  if (instance) return instance;
  instance = new FollowModel();
  return instance;
};
