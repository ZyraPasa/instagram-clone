import sirv from "sirv";
import express from "express";
import cookie from "cookie";
import compression from "compression";
import * as sapper from "@sapper/server";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(fileUpload({ limit: { fileSize: 10 * 1024 * 1024 }, abortOnLimit: true }));

app.use(compression({ threshold: 0 }));
app.use(sirv("static", { dev }));
app.use(
  sapper.middleware({
    session: (req) => {
      let headerCookie = req.headers.cookie;
      if (typeof headerCookie !== "string") {
        headerCookie = "";
      }
      const cookies = cookie.parse(headerCookie);
      return { jwtKey: cookies.token || undefined, userId: undefined };
    },
  })
);
app.listen(PORT, (err) => {
  if (err) console.log("error", err);
});
