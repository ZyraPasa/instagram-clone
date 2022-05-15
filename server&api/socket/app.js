import { Server } from "socket.io";
import { jwtControl } from "./middleware/jwtControl.js";

export const io = new Server({ cors: { origin: "http://localhost:3000" } });

io.use(jwtControl);

let activeUsers = [];

io.on("connect", (socket) => {
  socket.on("addUser", (data) => {
    const userIndex = activeUsers.findIndex((a) => a.accountId === socket.accountId);
    if (userIndex === -1) {
      activeUsers.push({ accountId: data, socketId: socket.id });
    } else {
      activeUsers[userIndex].socketId = socket.id;
    }
  });
  socket.on("newMessage", (data) => {
    const targetAccountActiveControl = activeUsers.findIndex((a) => a.accountId === data.targetAccountId);
    if (targetAccountActiveControl === -1) return;
    io.to(activeUsers[targetAccountActiveControl].socketId).emit("getMessage", {
      senderAccount: data.senderAccount,
      messageContent: data.messageContent,
    });
  });
  socket.on("viewMessage", (data) => {
    const targetAccountActiveControl = activeUsers.findIndex((a) => a.accountId === data.targetAccountId);
    if (targetAccountActiveControl === -1) return;
    io.to(activeUsers[targetAccountActiveControl].socketId).emit("getViewMessage", data.sender_id);
  });
  socket.on("disconnect", (socket) => {
    const userIndex = activeUsers.findIndex((a) => a.socketId === socket.id);
    if (userIndex !== -1) return activeUsers.splice(userIndex, 1);
  });
});

io.listen(8900);
