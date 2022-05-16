import "dotenv/config";
import expressSession from "express-session";

const sessionConfig = {
  name: "session",
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
};

export const session = () => expressSession(sessionConfig);
