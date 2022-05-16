import mysqlSync from "sync-mysql";
require("dotenv").config();

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const dbConfig2 = {
  // web database
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_WEB_DATABASE_PASSWORD,
  database: process.env.MYSQL_WEB_DATABASE,
};

export const init = () => {
  return new mysqlSync(dbConfig);
};

export const init2 = () => {
  return new mysqlSync(dbConfig2);
};
