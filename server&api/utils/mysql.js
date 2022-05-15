import "dotenv/config";
import mysql from "mysql";

const userDb = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

export const databaseConnection = () => mysql.createConnection(userDb);
