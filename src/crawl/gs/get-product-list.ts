import puppeteer from "puppeteer";
import { sleep } from "../../util";

const getRemoteProductId = async (imageUrl: string) => {
  if (!imageUrl) return "";
  // https://image.woodongs.com/imgsvr/item/GD_8801104942485_001.jpg
  // 정규식을 사용하여 "GD_" 다음에 오는 숫자 및 밑줄(_) 사이의 데이터 추출
  const remoteImageProductId = imageUrl.replace(
    "https://image.woodongs.com/imgsvr/item/GD_",
    ""
  );

  // 추출된 데이터 출력
  if (!remoteImageProductId) return "";
  let result = "";
  if (remoteImageProductId.includes("_"))
    result = remoteImageProductId.split("_")[0];
  else result = remoteImageProductId.split(".")[0];
  return result;
};

const convertPriceToInteger = (priceToString: string) => {
  const result = priceToString.replace(/[^0-9]/g, "");
  if (!result) return 0;
  return parseInt(result);
};

const convertEventType = (event_type: string) => {
  const convertObj = {
    TWO_TO_ONE: "2+1",
    ONE_TO_ONE: "1+1",
    GIFT: "덤증정",
  };
  const result = event_type.replace("flag_box ", "");
  if (!result) return "";
  return convertObj[result];
};

export default async () => {
  const browser = await puppeteer.launch({ headless: false });
  // Launch the browser and open a new blank page
  // const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const products = [];

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Navigate the page to a URL
  await page.goto("http://gs25.gsretail.com/gscvs/ko/products/event-goods");

  // id가 "TOTAL"인 a 태그를 가져오기
  const totalBtn = await page.waitForSelector("a#TOTAL");

  if (!totalBtn) {
    console.log("전체 삭품 버튼 없음");
    return;
  }

  await totalBtn.click();
  await sleep(1000 * 2);
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  let current_page = 1;

  while (true) {
    await sleep(1500);
    console.log("current_page : ", current_page);
    const productContainer = await page.waitForSelector("ul.prod_list");
    const productElements = await productContainer.$$("li > div.prod_box"); // Select all <li> elements inside productContainer

    for (let productElement of productElements) {
      const productNameContainer = await productElement.$("p.tit");
      const product_name = await productNameContainer.evaluate(
        (node) => node.textContent
      );
      const productImageContainer = await productElement.$("p.img > img");
      const product_image = await productImageContainer?.evaluate((node) =>
        node.getAttribute("src")
      );
      if (!product_image) continue;

      const priceContainer = await productElement.$("p.price > span.cost");
      const price = await priceContainer.evaluate((node) => node.textContent);
      const flagBoxContainer = await productElement.$("div.flag_box");
      const event_type = await flagBoxContainer.evaluate(
        (node) => node.className
      );
      const remote_product_id = await getRemoteProductId(product_image);

      if (!remote_product_id) continue;
      const productInstance = {
        remote_product_id,
        store_id: 1,
        event_type: convertEventType(event_type),
        product_name,
        price: convertPriceToInteger(price),
        price_origin: convertPriceToInteger(price),
        product_image,
      };
      products.push(productInstance);
    }

    if (productElements.length != 8) {
      break;
    }
    const pagingContainer = await page.waitForSelector("div.paging");
    const lastPageBtn = await pagingContainer.waitForSelector("a.next");
    // html handler ( solution )
    await page.evaluate((element) => {
      element.click();
    }, lastPageBtn);
    current_page++;
  }
  await browser.close();
  return products;
};
