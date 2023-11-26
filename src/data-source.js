import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config({});

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.LOCAL_CRAWL_DB_HOST,
  port: parseInt(process.env.LOCAL_CRAWL_DB_PORT),
  username: process.env.LOCAL_CRAWL_DB_USERNAME,
  password: process.env.LOCAL_CRAWL_DB_PASSWORD,
  database: process.env.LOCAL_CRAWL_DB_DATABASE,
});
