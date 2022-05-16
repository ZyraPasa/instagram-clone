<script>
  import Comment from "./comment.svelte";
  import Inputs from "../../input-new/input.svelte";
  import Button from "../../button/button.svelte";
  import { validateMaxLength } from "../../../_lib/validationHelpers/validateMaxLength.js";
  import { validateMinLength } from "../../../_lib/validationHelpers/validateMinLength.js";
  import { goto, stores } from "@sapper/app";
  const { session } = stores();
  export let myProfile = {};
  export let postDetail = {};
  let comment = [];
  let formInputs = {
    comment: {
      value: "",
      validate: false,
    },
  };

  const processLikePost = async () => {
    const resultLikePost = await fetch(`http://localhost:5500/posts/account/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
      body: JSON.stringify({ postId: postDetail.id }),
    });
    const result = await resultLikePost.json();
    if (!result.status) return; // hata mesajı
    postDetail.account_post_like = 1;
    postDetail.like_count++;
  };
  const processSavePost = async () => {
    const resultSavePost = await fetch(`http://localhost:5500/posts/account/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
      body: JSON.stringify({ postId: postDetail.id }),
    });
    const result = await resultSavePost.json();
    if (!result.status) return; // hata mesajı
    postDetail.account_post_saved = 1;
  };
  const processUnlikePost = async () => {
    const unlikePost = await fetch(`http://localhost:5500/posts/account/like`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
      body: JSON.stringify({ postId: postDetail.id }),
    });
    const result = await unlikePost.json();
    if (!result.status) return; // hata mesajı
    postDetail.account_post_like = 0;
    postDetail.like_count--;
  };
  const processUnsavePost = async () => {
    const unsavePost = await fetch(`http://localhost:5500/posts/account/save`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
      body: JSON.stringify({ postId: postDetail.id }),
    });
    const result = await unsavePost.json();
    if (!result.status) return; // hata mesajı
    postDetail.account_post_saved = 0;
  };

  //

  const getComments = async () => {
    const resultComments = await fetch(
      `http://localhost:5500/posts/account/comments/${postDetail.id}/${comment.length}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${$session.jwtKey}`,
        },
      }
    );
    return await resultComments.json();
  };

  const processGetComments = async () => {
    const result = await getComments();
    if (!result.status) return;
    if (!result.data.length) return;
    comment = [...comment, ...result.data];
    postDetail.comment_count = postDetail.comment_count - result.data.length;
  };

  const newComment = async () => {
    const resultNewComment = await fetch(`http://localhost:5500/posts/account/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
      body: JSON.stringify({ inputs: formInputs, postId: postDetail.id }),
    });
    return await resultNewComment.json();
  };

  const processNewComment = async () => {
    const keys = Object.keys(formInputs);
    let activeError = [];
    keys.forEach((k) => {
      formInputs[k].value = formInputs[k].value.trim();
      if (!formInputs[k].validate) activeError.push(k);
    });
    if (activeError.length) return; // hata mesajı
    const resultNewComment = await newComment();
    if (!resultNewComment.status) return;
    comment = [
      {
        username: myProfile.username,
        verified: myProfile.verified,
        comment: formInputs.comment.value,
      },
      ...comment,
    ];
    formInputs.comment.value = "";
  };
</script>

<div class="post">
  <div class="post-head">
    <div class="post-head-content">
      <div class="post-head-content-image">
        <img src={postDetail.avatar_url || "/photo/default-profile.png"} alt="profile" />
      </div>
      <div class="post-head-content-title">
        <a href="/profile/{postDetail.username}">{postDetail.username}</a>
        {#if postDetail.verified}
          <div class="verified">
            <span class="material-icons">verified</span>
          </div>
        {/if}
      </div>
    </div>
    <!-- <div class="post-head-settings">settings</div> -->
  </div>
  <div class="post-body">
    <div class="post-body-content">
      <img src={postDetail.post_url} alt="post" />
    </div>
  </div>
  <div class="post-footer">
    <div class="post-footer-head">
      <div class="post-footer-head-box">
        <div class="post-footer-head-box-left">
          <div class="post-like">
            {#if postDetail.account_post_like}
              <span class="material-icons-outlined" on:click={processUnlikePost}> favorite </span>
            {:else}
              <span class="material-icons-outlined" on:click={processLikePost}> favorite_border </span>
            {/if}
          </div>
          <div class="post-message">
            <span class="material-icons-outlined"> maps_ugc </span>
          </div>
        </div>
        <div class="post-footer-head-box-right">
          <div class="post-save">
            {#if postDetail.account_post_saved}
              <span class="material-icons-outlined" on:click={processUnsavePost}> bookmark </span>
            {:else}
              <span class="material-icons-outlined" on:click={processSavePost}> bookmark_border </span>
            {/if}
          </div>
        </div>
      </div>
    </div>
    <div class="post-footer-body">
      <div class="post-footer-body-box">
        <div class="like-amount"><span>{postDetail.like_count}</span> beğenme</div>
        {#if postDetail.post_title}
          <div class="post-title-box">
            <div class="title">
              <span>{postDetail.username}</span>
              {postDetail.post_title}
            </div>
          </div>
        {/if}
        <div class="post-comment-box">
          <div class="post-comments">
            {#each comment as c}
              <Comment data={c} />
            {/each}
          </div>
          {#if postDetail.comment_count}
            <div class="post-comment-button">
              <a href="/" on:click|preventDefault={processGetComments}>{postDetail.comment_count} yorumun tümünü gör</a>
            </div>
          {/if}
        </div>
      </div>
    </div>
    <div class="post-footer-input">
      <form>
        <Inputs
          bind:value={formInputs.comment.value}
          bind:valid={formInputs.comment.validate}
          validation={[
            new validateMaxLength(formInputs.comment.value, "Yorum", 256),
            new validateMinLength(formInputs.comment.value, "Yorum", 1),
          ]}
          settings={{ type: "text", placeholder: "Yorum ekle..." }}
          style={{ "background-color": "none", width: "100%", "font-size": "0.9em" }}
        />
        <Button text="Paylaş" color="none" type="submit" on:click={processNewComment} />
      </form>
    </div>
  </div>
</div>

<style lang="scss">
  @import "./_style.scss";
</style>
