import { getEventDetail } from "../../util/index.js";
import * as cheerio from "cheerio";

export default async (entity) => {
  const { href } = entity;
  const data = await getEventDetail(href);
  const $ = cheerio.load(data);
  const $webContents = $("#contents");
  const eventDetailImages = $webContents.find("p > img");
  // eventDetailImages에 있는 모든 이미지 태그의 src 속성 값을 배열로 가져오기

  const imageSrcs = eventDetailImages
    .map((index, element) => {
      return $(element).attr("src");
    })
    .get();
  entity.setDetailImages(imageSrcs);
};
