import express from "express";
import { postServices } from "../lib/posts/PostServices.js";
import { jwtControl } from "../middlewares/jwtControl.js";
import { controlPostCommentInput } from "../middlewares/controlPostCommentInput.js";
import { controlPageNumber } from "../middlewares/controlActivePosts.js";

const router = express.Router();

router.get("/account/:accountId", [jwtControl], async (req, res) => {
  const { accountId } = req.params;
  const resultAccountPosts = await postServices().getAccountPosts(accountId);
  res.json(resultAccountPosts);
});

router.get("/account/likes/:accountId", [jwtControl], async (req, res) => {
  const { accountId } = req.params;
  const resultAccountLikePosts = await postServices().getAccountLikePosts(accountId);
  res.json(resultAccountLikePosts);
});

router.post("/account/like", [jwtControl], async (req, res) => {
  const { postId } = req.body;
  const resultAddPostLike = await postServices().addPostLike(req.accountId, postId);
  res.json(resultAddPostLike);
});

router.delete("/account/like", [jwtControl], async (req, res) => {
  const { postId } = req.body;
  const resultRemovePostLike = await postServices().removePostLike(req.accountId, postId);
  res.json(resultRemovePostLike);
});

router.get("/account/saved/:accountId", [jwtControl], async (req, res) => {
  const { accountId } = req.params;
  const resultAccountSavePosts = await postServices().getAccountSavePosts(accountId);
  res.json(resultAccountSavePosts);
});

router.post("/account/save", [jwtControl], async (req, res) => {
  const { postId } = req.body;
  const resultRemovePostSave = await postServices().addPostSave(req.accountId, postId);
  res.json(resultRemovePostSave);
});

router.delete("/account/save", [jwtControl], async (req, res) => {
  const { postId } = req.body;
  const resultRemovePostSave = await postServices().removePostSave(req.accountId, postId);
  res.json(resultRemovePostSave);
});

router.get("/account/follows/allPostDetail/:pageNumber", [jwtControl, controlPageNumber], async (req, res) => {
  const { pageNumber } = req.params;
  const resultAccountFollowAllPostDetail = await postServices().getAccountFollowAllPostDetail(
    req.accountId,
    pageNumber
  );
  res.json(resultAccountFollowAllPostDetail);
});

router.get("/account/comments/:postId/:pageNumber", [jwtControl, controlPageNumber], async (req, res) => {
  const { postId, pageNumber } = req.params;
  const resultComments = await postServices().getPostComments(postId, pageNumber);
  res.json(resultComments);
});

router.post("/account/comment", [jwtControl, controlPostCommentInput], async (req, res) => {
  const resultAddPostComment = await postServices().addPostComment({
    accountId: req.accountId,
    postId: req.body.postId,
    comment: req.body.inputs.comment.value,
  });
  res.json(resultAddPostComment);
});

export default router;
