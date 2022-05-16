import { postDatabase } from "./PostDatabase.js";

class PostModel {
  #Posts = {};
  async addNewPost(data) {
    this.#Posts.account_id = data.accountId;
    this.#Posts.post_url = data.postUrl;
    this.#Posts.post_title = data.postTitle;
    return await postDatabase().addPost(this.#Posts);
  }
  async getAccountPosts(accountId) {
    const resultAccountPosts = await postDatabase().getAccountPosts(accountId);
    if (!resultAccountPosts.status) return resultAccountPosts;
    if (!resultAccountPosts.data.length) return { status: false, message: "Hesaba ait hiçbir post bulunamadı!" };
    return resultAccountPosts;
  }
  async getAccountLikePosts(accountId) {
    const resultAccountLikePosts = await postDatabase().getAccountLikePosts(accountId);
    if (!resultAccountLikePosts.status) return resultAccountLikePosts;
    if (!resultAccountLikePosts.data.length) return { status: false, message: "Beğenilen post bulunamadı!" };
    return resultAccountLikePosts;
  }
  async getAccountSavePosts(accountId) {
    const resultAccountSavePosts = await postDatabase().getAccountSavePosts(accountId);
    if (!resultAccountSavePosts.status) return resultAccountSavePosts;
    if (!resultAccountSavePosts.data.length) return { status: false, message: "Kayıt edilen post bulunamadı!" };
    return resultAccountSavePosts;
  }
  async getAccountFollowAllPostDetail(accountId, activePosts) {
    const resultAccountFollowAllPostDetail = await postDatabase().getAccountFollowAllPostDetail(accountId, activePosts);
    if (!resultAccountFollowAllPostDetail.status) return resultAccountFollowAllPostDetail;
    if (!resultAccountFollowAllPostDetail.data.length)
      return { status: false, message: "Aktif postlar görmek için birilerini takip etmelisin!" };
    return resultAccountFollowAllPostDetail;
  }
  async getAccountPostCount(accountId) {
    return await postDatabase().getAccountPostCount(accountId);
  }
  async getPostLikeCount(postId) {
    return await postDatabase().getPostLikeCount(postId);
  }
  async getPostCommentCount(postId) {
    return await postDatabase().getPostCommentCount(postId);
  }
  async addPostLike(accountId, postId) {
    const resultLikeControl = await postDatabase().getAccountLikePost(accountId, postId);
    if (!resultLikeControl.status) return resultLikeControl;
    if (resultLikeControl.data.length) return { status: false, message: "Bu postu zaten beğenmişsiniz!" };
    return await postDatabase().addAccountLikePost(accountId, postId);
  }
  async removePostLike(accountId, postId) {
    const resultLikeControl = await postDatabase().getAccountLikePost(accountId, postId);
    if (!resultLikeControl.status) return resultLikeControl;
    if (!resultLikeControl.data.length) return { status: false, message: "Bu postu beğenmemişsiniz!" };
    return await postDatabase().removeAccountLikePost(accountId, postId);
  }
  async addPostSave(accountId, postId) {
    const resultSaveControl = await postDatabase().getAccountSavePost(accountId, postId);
    if (!resultSaveControl.status) return resultSaveControl;
    if (resultSaveControl.data.length) return { status: false, message: "Bu postu zaten kayıt etmişsin!" };
    return await postDatabase().addAccountSavePost(accountId, postId);
  }
  async removePostSave(accountId, postId) {
    const resultSaveControl = await postDatabase().getAccountSavePost(accountId, postId);
    if (!resultSaveControl.status) return resultSaveControl;
    if (!resultSaveControl.data.length) return { status: false, message: "Bu postu kayıt etmemişsin!" };
    return await postDatabase().removeAccountSavePost(accountId, postId);
  }
  async getPostComments(data) {
    return await postDatabase().getPostComments(data.postId, data.activeCommentCount);
  }
  async addPostComment(data) {
    return await postDatabase().addPostComment(data.accountId, data.postId, data.comment);
  }
}

let instance;
export const postModel = () => {
  if (instance) return instance;
  instance = new PostModel();
  return instance;
};
