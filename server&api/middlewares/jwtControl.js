import "dotenv/config";
import jwtHelper from "../utils/jwt.js";

export const jwtControl = async (req, res, next) => {
  if (!req.headers.authorization) return res.json({ status: false, message: "JWT Key göndermeniz gerek!" });
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const jwt = new jwtHelper();
  const resultJwt = jwt.verify(token, process.env.JWT_KEY);
  if (!resultJwt.status) return res.json({ status: false, message: "Lütfen tekrar giriş yapın!" });
  req.accountId = resultJwt.data.userId;
  next();
};
