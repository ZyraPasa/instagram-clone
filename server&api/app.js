import "dotenv/config";
import express from "express";
import users from "./routes/users.js";
import messages from "./routes/messages.js";
import posts from "./routes/posts.js";
import { session } from "./middlewares/session.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwtHelper from "./utils/jwt.js";
import { io } from "./socket/app.js";
import multer from "multer";
import bodyParser from "body-parser";

const app = express();

app.use(express.static("static"));

app.use(cookieParser());

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", users);
app.use("/messages", messages);
app.use("/posts", posts);

app.get("/jwtControl", (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const jwt = new jwtHelper();
  const resultJwt = jwt.verify(token, process.env.JWT_KEY);
  res.json(resultJwt);
});

/// socket io

io;

app.listen(process.env.API_PORT, () => {
  console.log(`http://localhost:${process.env.API_PORT}`);
});
