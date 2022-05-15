import "dotenv/config";
import { userModel } from "./UserModel.js";
import { followModel } from "../follow/FollowModel.js";
import { postServices } from "../posts/PostServices.js";
import TypeCheck from "../../utils/typeCheck.js";
import jwtHelper from "../../utils/jwt.js";

class UserServices {
  async getAll() {
    return await userModal().getAll();
  }
  async getUserProfile(userId) {
    return await userModel().getUserProfile("id", userId);
  }
  async getUserProfileDetail(userName) {
    const userProfile = await userModel().getUserProfile("username", userName);
    if (!userProfile.status) return userProfile;
    const userFollowerCount = await this.getFollowerCount(userProfile.data.id);
    const userFollowCount = await this.getFollowCount(userProfile.data.id);
    const userPostCount = await postServices().getAccountPostCount(userProfile.data.id);
    userProfile.data.followerCount = userFollowerCount.count || "0";
    userProfile.data.followCount = userFollowCount.count || "0";
    userProfile.data.postCount = userPostCount.count || "0"; //
    return userProfile;
  }
  async newUser(data) {
    const type = new TypeCheck();
    if (!type.isObject(data)) return { status: false, message: "Lütfen obje girin" };
    const resultAddUser = await userModel().addUser(data);
    if (!resultAddUser.status) return resultAddUser;
    const jwt = new jwtHelper();
    const token = jwt.generate({ userId: resultAddUser.info.insertId }, process.env.JWT_KEY);

    return {
      status: true,
      message: "Başarılı bir şekilde hesap oluşturuldu!",
      token: token,
      userId: resultAddUser.info.insertId,
    };
  }
  async loginUser(data) {
    const type = new TypeCheck();
    if (!type.isObject(data)) return { status: false, message: "Lütfen obje girin" };
    const resultControl = await userModel().controlUser(data);
    if (!resultControl.status) return resultControl;
    const jwt = new jwtHelper();
    const token = jwt.generate({ userId: resultControl.userId }, process.env.JWT_KEY);
    return {
      status: true,
      message: "Başarılı bir şekilde giriş yapıldı!",
      token: token,
      userId: resultControl.userId,
    };
  }
  async updateUserProfile(data, accountId) {
    const type = new TypeCheck();
    if (!type.isObject(data)) return { status: false, message: "Lütfen obje girin" };
    return await userModel().editUserProfile(data, accountId);
  }
  async changePassword(data, accountId) {
    const type = new TypeCheck();
    if (!type.isObject(data)) return { status: false, message: "Lütfen obje girin" };
    return await userModel().changePassword(data, accountId);
  }
  async searchAccount(value) {
    return await userModel().searchUser(value);
  }
  async followUser(data) {
    const type = new TypeCheck();
    if (!type.isObject(data)) return { status: false, message: "Lütfen obje girin" };
    return await followModel().fallowAccount(data.accountId, data.targetAccountId);
  }
  async unfollowUser(data) {
    const type = new TypeCheck();
    if (!type.isObject(data)) return { status: false, message: "Lütfen obje girin" };
    return await followModel().unfollowAccount(data.accountId, data.targetAccountId);
  }
  async followControl(accountId, targetAccountId) {
    return await followModel().followControl(accountId, targetAccountId);
  }
  async getFollowerCount(accountId) {
    return await followModel().getFollower(accountId);
  }
  async getFollowCount(accountId) {
    return await followModel().getFollow(accountId);
  }
  async changeAvatar(data) {
    if (!data || !data.avatarName) return { status: false, message: "Lütfen geçerli bir avatar ismi girin!" };
    return await userModel().changeAvatar(data.accountId, data.avatarName);
  }
}

let instance;

export const userServices = () => {
  if (!instance) {
    return new UserServices();
  }
  return instance;
};
