import { GsEventList } from "./entity/gs/gs-event-list.js";
import getGsEventList from "./events/gs/gs-event-list.js";
import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const gsEventList = await getGsEventList(browser);
  const gsEventEntities = gsEventList.map((obj) => new GsEventList(obj));
  console.log("gsEventEntities : ", gsEventEntities);

  await browser.close();
})();
