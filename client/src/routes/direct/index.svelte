<script>
  import Layout from "../../components/pages/layout.svelte";
  import Message from "../../components/message/message.svelte";
  import Input from "../../components/input-new/input.svelte";
  import Button from "../../components/button/button.svelte";
  import MoreButton from "../../components/moreButton/moreButton.svelte";
  import { validateMaxLength } from "../../_lib/validationHelpers/validateMaxLength.js";
  import { validateMinLength } from "../../_lib/validationHelpers/validateMinLength.js";
  import { goto, stores } from "@sapper/app";
  const { session } = stores();
  import { onDestroy, onMount } from "svelte";
  import { io } from "socket.io-client";
  import Modal from "../../components/modal-new/modal-new.svelte";

  let myProfile = {};
  let isMobileMenu = false;
  let isModal = false;
  let div;
  let userList = [];
  let messageBox = [];
  let activeMessages = [];
  let activeMessageBox = undefined;
  let formInputs = {
    message: {
      value: "",
      validate: false,
    },
    search: {
      value: "",
      validate: false,
    },
  };

  const changeMobileMenu = () => (isMobileMenu = !isMobileMenu);

  const scrollMove = () => {
    setTimeout(() => {
      div.scrollTop = div.scrollHeight;
    }, 1);
  };

  const changeModal = () => (isModal = !isModal);

  //

  const searchAccount = async () => {
    const resultSearchAccount = await fetch(`http://localhost:5500/users/search/${formInputs.search.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
    });
    const result = await resultSearchAccount.json();
    if (!result.status) return;
    userList = result.data;
  };

  const processSearch = async () => {
    if (!formInputs.search.value) return;
    if (!formInputs.search.validate) return;
    await searchAccount();
  };

  const processNewConversation = (user) => {
    changeModal();
    messageBox = [
      {
        avatar_url: user.avatar_url,
        id: user.id,
        username: user.username,
      },
      ...messageBox,
    ];
    processConversation(user.id, 0);
  };

  //

  const getMessageBoxList = async () => {
    const resultMessageBoxList = await fetch(`http://localhost:5500/messages/direct/box`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
    });
    const result = await resultMessageBoxList.json();
    if (!result.status) return;
    messageBox = result.data;
  };

  const getMessages = async (targetAccountId) => {
    const resultMessages = await fetch(
      `http://localhost:5500/messages/direct/${targetAccountId}/${activeMessages.length}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${$session.jwtKey}`,
        },
      }
    );
    return await resultMessages.json();
  };

  const processConversation = async (targetAccountId, index) => {
    isMobileMenu = false;
    activeMessages = [];
    activeMessageBox = undefined;
    const resultGetMessages = await getMessages(targetAccountId);
    if (!resultGetMessages.status) return;
    activeMessages = resultGetMessages.data;
    activeMessageBox = index;
    scrollMove();
    viewAllMessage(targetAccountId);
    socket.emit("viewMessage", {
      targetAccountId: messageBox[index].id,
      sender_id: $session.userId,
    });
  };

  const processMoreMessages = async () => {
    const resultGetMessages = await getMessages(messageBox[activeMessageBox].id);
    if (!resultGetMessages.status) return;
    activeMessages = [...resultGetMessages.data, ...activeMessages];
  };

  const newMessage = async () => {
    const resultNewMessage = await fetch(`http://localhost:5500/messages/direct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
      body: JSON.stringify({ targetAccountId: messageBox[activeMessageBox].id, inputs: formInputs }),
    });
    return await resultNewMessage.json();
  };

  const processNewMessage = async () => {
    if (messageBox[activeMessageBox].id === undefined) return; // hata mesajı
    if (!formInputs.message.validate) return; // hata mesajı
    const resultNewMessage = await newMessage();
    if (!resultNewMessage.status) return;
    activeMessages = [
      ...activeMessages,
      {
        sender_id: $session.userId,
        message_content: formInputs.message.value,
      },
    ];

    // messageBox[activeMessageBox].last_message = formInputs.message.value;

    const messageBoxIndex = messageBox.findIndex((mb) => mb.id === messageBox[activeMessageBox].id);
    const messageBoxClone = messageBox[messageBoxIndex];
    messageBox.splice(messageBoxIndex, 1);
    messageBoxClone.last_message = formInputs.message.value;
    activeMessageBox = 0;
    messageBox = [messageBoxClone, ...messageBox];

    socket.emit("newMessage", {
      senderAccount: myProfile,
      targetAccountId: messageBox[0].id,
      messageContent: formInputs.message.value,
    });
    formInputs.message.value = "";
    scrollMove();
  };

  const viewAllMessage = (targetAccountId) => {
    fetch(`http://localhost:5500/messages/direct/viewAllMessages`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.jwtKey}`,
      },
      body: JSON.stringify({ targetAccountId: targetAccountId }),
    });
  };

  onMount(async () => {
    await getMessageBoxList();
  });

  onDestroy(() => {
    messageBox = undefined;
  });

  ////

  const socket = io("http://localhost:8900", {
    auth: {
      token: $session.jwtKey,
    },
  });

  socket.emit("addUser", $session.userId);

  socket.on("getMessage", (data) => {
    if (!messageBox) return;
    const senderMessageBoxIndex = messageBox.findIndex((mb) => mb.id === data.senderAccount.id);
    if (senderMessageBoxIndex === -1) {
      messageBox = [data.senderAccount, ...messageBox];
      messageBox[0].last_message = data.messageContent;
      // bildirim
    } else {
      const senderMessageBox = messageBox.find((mb) => mb.id === data.senderAccount.id);
      if (senderMessageBoxIndex > activeMessageBox) activeMessageBox++;
      senderMessageBox.last_message = data.messageContent;
      messageBox.splice(senderMessageBoxIndex, 1);
      messageBox = [senderMessageBox, ...messageBox];
      // bildirim
    }
    if (activeMessageBox === undefined) return;
    if (messageBox[activeMessageBox].id !== data.senderAccount.id) return;
    activeMessages = [
      ...activeMessages,
      {
        message_content: data.messageContent,
        avatar_url: messageBox[activeMessageBox].avatar_url,
      },
    ];
    viewAllMessage(messageBox[activeMessageBox].id);
    socket.emit("viewMessage", {
      targetAccountId: messageBox[activeMessageBox].id,
      sender_id: $session.userId,
    });
    scrollMove();
  });
  socket.on("getViewMessage", (accountId) => {
    if (!messageBox) return;
    if (!activeMessages.length) return;
    const senderMessageBox = messageBox.findIndex((mb) => mb.id === accountId);
    if (messageBox[senderMessageBox].id !== accountId) return;
    activeMessages[activeMessages.length - 1].message_view = 1;
  });
</script>

<svelte:head>
  <title>Mesaj Gönder • ZyraPasaa</title>
</svelte:head>

<Modal bind:isOpen={isModal} borderRadius="12px">
  <div class="new-conversation-box">
    <div class="new-conversation-box-head">
      <div class="new-conversation-box-head-title">
        <span>Yeni Mesaj</span>
      </div>
      <div class="new-conversation-box-head-close-button" on:click={changeModal}>
        <span class="material-icons-outlined"> close </span>
      </div>
    </div>
    <div class="new-conversation-box-body">
      <p>Kime:</p>
      <Input
        bind:value={formInputs.search.value}
        bind:valid={formInputs.search.validate}
        validation={[new validateMaxLength(formInputs.search.value, "Burası", 64)]}
        settings={{ type: "text", placeholder: "Ara..." }}
        style={{ width: "100%", "font-weight": "bold" }}
        on:keyup={processSearch}
      />
    </div>
    <div class="new-conversation-box-footer">
      {#if !userList.length}
        <div class="no-found-box">
          <p>Hiç bir sonuç bulunamadı!</p>
        </div>
      {:else}
        <div class="search-result">Sonuçlar</div>
        <ul>
          {#each userList as user}
            <li>
              <a href="/" on:click|preventDefault={() => processNewConversation(user)}>
                <div class="profile-image-box">
                  <img src={user.avatar_url || "/photo/default-profile.png"} alt="profile" />
                </div>
                <div class="profile-text-box">
                  <div class="profile-text-box-username">
                    {user.username}
                    {#if user.verified}
                      <span class="material-icons-outlined"> verified </span>
                    {/if}
                  </div>
                  <div class="profile-text-box-name">{user.name}</div>
                </div>
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</Modal>

<Layout fullScreen={true} bind:myProfile>
  <div class="direct">
    <div class="direct-box" class:open={isMobileMenu}>
      <div class="direct-box-conversation">
        <div class="direct-box-conversation-head">
          <p>{myProfile.username}</p>
          <div class="new-user-button" on:click={changeModal}>
            <span class="material-icons-outlined">widgets</span>
          </div>
        </div>
        <div class="direct-box-conversation-body">
          {#if messageBox}
            <div class="direct-box-conversation-body-menu">
              <ul>
                {#each messageBox as conversation, i}
                  <li>
                    <a href="/" on:click|preventDefault={() => processConversation(conversation.id, i)}>
                      <div class="direct-box-conversation-body-list-image">
                        <img src={conversation.avatar_url || "/photo/default-profile.png"} alt="profile" />
                      </div>
                      <div class="direct-box-conversation-body-list-content">
                        <div class="direct-box-conversation-body-list-content-title">{conversation.username}</div>
                        {#if conversation.last_message}
                          <div class="direct-box-conversation-body-list-content-text">
                            {conversation.last_message}
                          </div>
                        {/if}
                      </div>
                    </a>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      </div>
      <div class="direct-box-message">
        <div class="direct-box-message-head">
          <div class="mobile-open" on:click={changeMobileMenu}>
            <span class="material-icons-outlined">view_headline</span>
          </div>
          <a href="/">
            {#if activeMessageBox === undefined}
              <div class="direct-box-message-head-title">{myProfile.username}</div>
            {:else}
              <div class="direct-box-message-head-image">
                <img src={messageBox[activeMessageBox].avatar_url || "/photo/default-profile.png"} alt="profile" />
              </div>
              <div class="direct-box-message-head-title">{messageBox[activeMessageBox].username}</div>
            {/if}
          </a>
        </div>
        <div class="direct-box-message-content">
          <div class="direct-box-message-content-body" bind:this={div}>
            {#if activeMessageBox === undefined}
              <div class="direct-box-message-content-no-message">
                <div class="no-message-head">
                  <span class="material-icons-outlined" style="font-size: 3em;"> send </span>
                </div>
                <div class="no-message-body">
                  <h2>Mesajların</h2>
                  <h3 style="color: gray;">Bir arkadaşına ve ya gruba mesaj gönder.</h3>
                  <br />
                  <Button color="blue" text="Mesaj Gönder" />
                </div>
              </div>
            {:else}
              <div class="direct-box-message-content-body-messages">
                {#if activeMessages.length >= 15}
                  <MoreButton iconName="expand_less" on:click={processMoreMessages} />
                {/if}
                {#if activeMessages.length}
                  {#each activeMessages as message}
                    <Message
                      own={message.sender_id === $session.userId}
                      message={message.message_content}
                      imageUrl={messageBox[activeMessageBox].avatar_url || "/photo/default-profile.png"}
                    />
                  {/each}
                  {#if activeMessages[activeMessages.length - 1].receiver_id !== $session.userId && activeMessages[activeMessages.length - 1].message_view === 1}
                    <div class="view-message-box">Görüldü!</div>
                  {/if}
                {/if}
              </div>
            {/if}
          </div>
          {#if activeMessageBox !== undefined}
            <div class="direct-box-message-content-footer">
              <div class="inputs">
                <form>
                  <Input
                    bind:value={formInputs.message.value}
                    bind:valid={formInputs.message.validate}
                    validation={[
                      new validateMaxLength(formInputs.message.value, "Mesaj", 256),
                      new validateMinLength(formInputs.message.value, "Mesaj", 0),
                    ]}
                    settings={{ type: "text", placeholder: "Mesaj..." }}
                    style={{ width: "100%", "font-weight": "bold" }}
                  />
                  <div class="send-button">
                    <Button text="Gönder" color="none" type="submit" on:click={processNewMessage} />
                  </div>
                </form>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</Layout>

<style lang="scss">
  @import "./_style.scss";
  .view-message-box {
    text-align: right;
    margin-right: 0.5em;
    font-size: 12px;
    color: gray;
  }
</style>
