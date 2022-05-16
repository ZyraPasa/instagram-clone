import express from "express";
import { jwtControl } from "../middlewares/jwtControl.js";
import { messageServices } from "../lib/message/MessageServices.js";
import { controlNewMessageInput } from "../middlewares/controlNewMessageInput.js";
import { controlPageNumber } from "../middlewares/controlActivePosts.js";

const router = express.Router();

//////

router.get("/direct/box", [jwtControl], async (req, res) => {
  const resultDirectBoxList = await messageServices().getMessageBoxList(req.accountId);
  res.json(resultDirectBoxList);
});

router.get("/direct/:targetAccountId/:pageNumber", [jwtControl, controlPageNumber], async (req, res) => {
  const { targetAccountId, pageNumber } = req.params;
  const resultGetDirectMessages = await messageServices().getDirectMessages({
    accountId: req.accountId,
    targetAccountId: targetAccountId,
    activeMessageCount: pageNumber,
  });
  res.json(resultGetDirectMessages);
});

router.post("/direct", [jwtControl, controlNewMessageInput], async (req, res) => {
  const resultNewMessage = await messageServices().newMessage({
    accountId: req.accountId,
    targetAccountId: req.body.targetAccountId,
    message: req.body.inputs.message.value,
  });
  res.json(resultNewMessage);
});

router.put("/direct/viewAllMessages", [jwtControl], (req, res) => {
  if (!req.body.targetAccountId) return res.json({ status: false, message: "Geçerli bir accountId girin!" });
  const resultViewAllMessages = messageServices().viewAllDirectMessage({
    accountId: req.accountId,
    targetAccountId: req.body.targetAccountId,
  });
  res.json(resultViewAllMessages);
});

export default router;
