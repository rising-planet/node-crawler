import * as dotenv from "dotenv";
import puppeteer from "puppeteer";
import getGsProductList from "./crawl/gs/get-product-list.js";
import { AppDataSource } from "./data-source.js";

dotenv.config({});

(async () => {
  const dataSource = await AppDataSource.initialize();
  const browser = await puppeteer.launch({ headless: false });
  console.log("test!!");
  // const temp = await getGsProductList();
  // console.log("temp : ", temp);
  // const gsEventList = await getGsEventList(browser);
  // await browser.close();
  // const gsEventEntities = gsEventList.map((obj) => new GsEventList(obj));
  // const getDetailImagesPending = gsEventEntities.map((entity) =>
  //   getGsEventDetail(entity)
  // );
  // await Promise.all(getDetailImagesPending);
  // console.log("gsEventEntities : ", gsEventEntities);
  // await browser.close();
})();
