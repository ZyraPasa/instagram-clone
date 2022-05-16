import { postModel } from "./PostModel.js";
import TypeCheck from "../../utils/typeCheck.js";

class PostServices {
  async getAccountFollowAllPostDetail(accountId, activePosts) {
    if (accountId === undefined) return { status: false, message: "Lütfen geçerli bir accountId id girin!" };
    return await postModel().getAccountFollowAllPostDetail(accountId, activePosts);
  }
  async getAccountPosts(accountId) {
    if (!accountId) return { status: false, message: "Lütfen geçerli bir hesap id girin!" };
    return await postModel().getAccountPosts(accountId);
  }
  async getAccountLikePosts(accountId) {
    if (accountId === undefined) return { status: false, message: "Lütfen geçerli bir hesap id girin!" };
    return await postModel().getAccountLikePosts(accountId);
  }
  async getAccountSavePosts(accountId) {
    if (accountId === undefined) return { status: false, message: "Lütfen geçerli bir hesap id girin!" };
    return await postModel().getAccountSavePosts(accountId);
  }
  async getAccountPostCount(accountId) {
    if (accountId === undefined) return { status: false, message: "Lütfen geçerli bir hesap id girin!" };
    return await postModel().getAccountPostCount(accountId);
  }
  async getPostLikeCount(postId) {
    if (postId === undefined) return { status: false, message: "Lütfen geçerli bir post id girin!" };
    return await postModel().getPostLikeCount(postId);
  }
  async getPostCommentCount(postId) {
    if (postId === undefined) return { status: false, message: "Lütfen geçerli bir post id girin!" };
    return await postModel().getPostCommentCount(postId);
  }
  async addPostLike(accountId, postId) {
    if (accountId === undefined) return { status: false, message: "Lütfen geçerli bir account id girin!" };
    if (postId === undefined) return { status: false, message: "Lütfen geçerli bir post id girin!" };
    return await postModel().addPostLike(accountId, postId);
  }
  async removePostLike(accountId, postId) {
    if (accountId === undefined) return { status: false, message: "Lütfen geçerli bir account id girin!" };
    if (postId === undefined) return { status: false, message: "Lütfen geçerli bir post id girin!" };
    return await postModel().removePostLike(accountId, postId);
  }
  async addPostSave(accountId, postId) {
    if (accountId === undefined) return { status: false, message: "Lütfen geçerli bir account id girin!" };
    if (postId === undefined) return { status: false, message: "Lütfen geçerli bir post id girin!" };
    return await postModel().addPostSave(accountId, postId);
  }
  async removePostSave(accountId, postId) {
    if (accountId === undefined) return { status: false, message: "Lütfen geçerli bir account id girin!" };
    if (postId === undefined) return { status: false, message: "Lütfen geçerli bir post id girin!" };
    return await postModel().removePostSave(accountId, postId);
  }
  async getPostComments(postId, activeComment) {
    if (postId === undefined) return { status: false, message: "Lütfen geçerli bir accountId id girin!" };
    return await postModel().getPostComments({ postId: postId, activeCommentCount: activeComment });
  }
  async addPostComment(data) {
    const type = new TypeCheck();
    if (!type.isObject(data)) return { status: false, message: "Lütfen obje girin" };
    return await postModel().addPostComment(data);
  }
}

let instance;
export const postServices = () => {
  if (instance) return instance;
  instance = new PostServices();
  return instance;
};
