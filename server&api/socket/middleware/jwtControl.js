import "dotenv/config";
import jwtHelper from "../utils/jwt.js";

export const jwtControl = async (socket, next) => {
  if (!socket.handshake.auth || !socket.handshake.auth.token) return;
  const token = socket.handshake.auth.token;
  const jwt = new jwtHelper();
  const resultJwt = jwt.verify(token, process.env.JWT_KEY);
  if (!resultJwt.status) return;
  socket.accountId = resultJwt.data.userId;
  next();
};
