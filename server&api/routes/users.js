import express from "express";
import cookieParser from "cookie-parser";
import { userServices } from "../lib/user/UserServices.js";
import { controlRegisterInputs } from "../middlewares/controlRegisterInputs.js";
import { controlLoginInput } from "../middlewares/controlLoginInput.js";
import { jwtControl } from "../middlewares/jwtControl.js";
import { controlEditProfileInput } from "../middlewares/controlEditProfileInput.js";
import { controlChangePasswordInput } from "../middlewares/controlChangePasswordInput.js";
import { controlSearchInput } from "../middlewares/controlSearchInput.js";
import multer from "multer";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.use(cookieParser());

const storage = multer.memoryStorage();
const uploads = multer({
  storage,
  limits: {
    fileSize: 1048576, // 10mb
  },
});

router.get("/profile/:userId", [jwtControl], async (req, res) => {
  const { userId } = req.params;
  const user = await userServices().getUserProfile(userId);
  res.json(user);
});

router.get("/profile/detail/:userName", [jwtControl], async (req, res) => {
  const { userName } = req.params;
  const userDetail = await userServices().getUserProfileDetail(userName);
  res.json(userDetail);
});

router.post("/register", [controlRegisterInputs], async (req, res) => {
  const resultAddUser = await userServices().newUser({
    email: req.body.inputs.email.value,
    name: req.body.inputs.name.value,
    username: req.body.inputs.nick.value,
    password: req.body.inputs.password.value,
  });
  if (resultAddUser.status) res.setHeader("token", resultAddUser.token);
  res.json(resultAddUser);
});

router.post("/login", [controlLoginInput], async (req, res) => {
  const resultLoginUser = await userServices().loginUser({
    username: req.body.inputs.username.value,
    password: req.body.inputs.password.value,
  });
  if (resultLoginUser.status) res.setHeader("token", resultLoginUser.token);
  res.json(resultLoginUser);
});

router.put("/edit", [jwtControl, controlEditProfileInput], async (req, res) => {
  const resultEditProfile = await userServices().updateUserProfile(
    {
      // username: req.body.inputs.username.value,
      name: req.body.inputs.name.value,
      biography: req.body.inputs.biography.value,
      website: req.body.inputs.website.value,
    },
    req.accountId
  );
  res.json(resultEditProfile);
});

router.put("/edit/password", [jwtControl, controlChangePasswordInput], async (req, res) => {
  const resultChangePassword = await userServices().changePassword(
    {
      oldPassword: req.body.inputs.oldPassword.value,
      newPassword: req.body.inputs.newPassword.value,
    },
    req.accountId
  );
  res.json(resultChangePassword);
});

router.get("/search/:value", [jwtControl, controlSearchInput], async (req, res) => {
  const { value } = req.params;
  const resultUsers = await userServices().searchAccount(value);
  res.json(resultUsers);
}); // kesinlikle rate limit olacak istisnasız ...

router.post("/change/avatar", [jwtControl, uploads.single("profile")], async (req, res) => {
  const fileId = uuidv4();
  const saveFile = await sharp(req.file.buffer)
    .resize({ width: 300, height: 300, fit: "cover", position: "center" })
    .toFormat("png")
    .toFile(`./static/${fileId}.png`)
    .then((result) => {
      return { status: true, message: "Başarılı bir şekilde resim kayıt edildi!", detail: result };
    })
    .catch((error) => {
      console.log(error);
      return { status: false, message: "Bilinmeyen bir hata oluştu!" };
    });
  if (!saveFile.status) return res.json(saveFile);
  const resultSaveDatabase = await userServices().changeAvatar({
    accountId: req.accountId,
    avatarName: fileId,
  });
  res.json(resultSaveDatabase);
});
//

router.post("/follow", [jwtControl], async (req, res) => {
  const resultUserFollow = await userServices().followUser({
    accountId: req.accountId,
    targetAccountId: req.body.targetAccountId,
  });
  res.json(resultUserFollow);
}); // RATE LİMİT KONULURSA İYİ OLUR

router.delete("/follow", [jwtControl], async (req, res) => {
  const resultUserUnfollow = await userServices().unfollowUser({
    accountId: req.accountId,
    targetAccountId: req.body.targetAccountId,
  });
  res.json(resultUserUnfollow);
}); // RATE LİMİT KONULURSA İYİ OLUR

router.get("/follow/control/:userId", [jwtControl], async (req, res) => {
  const { userId } = req.params;
  if (userId === undefined) return res.json(false);
  const resultFollowControl = await userServices().followControl(req.accountId, userId);
  res.json(resultFollowControl);
});

router.get("/follower/count/:accountId", [jwtControl], async (req, res) => {
  const { accountId } = req.params;
  const resultFollowerCount = await userServices().getFollowerCount(accountId);
  res.json(resultFollowerCount);
});

router.get("/follow/count/:accountId", [jwtControl], async (req, res) => {
  const { accountId } = req.params;
  const resultFollowCount = await userServices().getFollowCount(accountId);
  res.json(resultFollowCount);
});

export default router;
