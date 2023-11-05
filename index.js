import { GsEventList } from "./entity/gs/gs-event-list.js";
import getGsEventList from "./crawl/gs/gs-event-list.js";
import puppeteer from "puppeteer";
import getGsEventDetail from "./crawl/gs/get-event-detail.js";
import getGsProductList from "./crawl/gs/get-product-list.js";
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const temp = await getGsProductList();
  console.log("temp : ", temp);
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
