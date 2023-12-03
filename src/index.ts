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
  // const browser = await puppeteer.launch({ headless: false });
  const productParams = await getGsProductList();
  const filteredRemoteProductId = productParams.filter(
    (obj) => !obj.remote_product_id
  );
  const productIds = filteredRemoteProductId.map(
    (obj) => obj.remote_product_id
  );
  if (productParams.length > 0) {
    const productInstance = createRemoteCategoryInstance(productParams);
    const saveResult = await saveRemoteCategory(productInstance);
    console.log("saveResult : ", saveResult.length);
  }
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
