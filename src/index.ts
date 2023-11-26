import * as dotenv from "dotenv";
import puppeteer from "puppeteer";
import getGsProductList from "./crawl/gs/get-product-list";
import { AppDataSource } from "./data-source";
import {
  createRemoteCategoryInstance,
  saveRemoteCategory,
} from "./repo/product.repo";

dotenv.config({});

(async () => {
  const dataSource = await AppDataSource.initialize();
  const browser = await puppeteer.launch({ headless: false });
  const productParams = await getGsProductList();
  const productInstance = createRemoteCategoryInstance(productParams);
  const saveResult = await saveRemoteCategory(productInstance);
  console.log("saveResult : ", saveResult.length);
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
