import { GsEventList } from "./entity/gs/gs-event-list.js";
import getGsEventList from "./events/gs/gs-event-list.js";
import puppeteer from "puppeteer";
import getGsEventDetail from "./events/gs/get-event-detail.js";

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const gsEventList = await getGsEventList(browser);
  await browser.close();

  const gsEventEntities = gsEventList.map((obj) => new GsEventList(obj));
  const getDetailImagesPending = gsEventEntities.map((entity) =>
    getGsEventDetail(entity)
  );
  await Promise.all(getDetailImagesPending);
  console.log("gsEventEntities : ", gsEventEntities);
})();
