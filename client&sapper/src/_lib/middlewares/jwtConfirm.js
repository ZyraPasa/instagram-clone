import jwt from "jsonwebtoken";
require("dotenv").config();

export const confirmJWT = (req, res, next) => {
  if (!req.session.jwtKey) {
    return res.json({ status: false, message: "Lütfen giriş yapın!(Tekrar giriş yapmanız gerekmekte!)" });
  }
  try {
    const resultToken = jwt.verify(req.session.jwtKey, process.env.JWT_KEY);

    req.accountId = resultToken.userId;
    req.isAdmin = resultToken.isAdmin;

    next();
  } catch (error) {
    return res.json({ status: false, message: "Lütfen tekrar giriş yapın!" });
  }
};
