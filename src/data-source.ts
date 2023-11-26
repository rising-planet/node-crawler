import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { ProductEntity } from "./entity/gs/product";

dotenv.config({});

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.LOCAL_CRAWL_DB_HOST,
  port: parseInt(process.env.LOCAL_CRAWL_DB_PORT),
  username: process.env.LOCAL_CRAWL_DB_USERNAME,
  password: process.env.LOCAL_CRAWL_DB_PASSWORD,
  database: process.env.LOCAL_CRAWL_DB_DATABASE,
  synchronize: false,
  logging: false,
  timezone: "Z",
  entities: [ProductEntity],
  migrations: [],
  subscribers: [],
});
