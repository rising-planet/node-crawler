import puppeteer from "puppeteer";
import { Product } from "../../entity/gs/product.js";
import { sleep } from "../../util/index.js";

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
      const product_image =
        (await productImageContainer?.evaluate((node) =>
          node.getAttribute("src")
        )) || "이미지 준비중";
      const priceContainer = await productElement.$("p.price > span.cost");
      const price = await priceContainer.evaluate((node) => node.textContent);
      const flagBoxContainer = await productElement.$("div.flag_box");
      const event_type = await flagBoxContainer.evaluate(
        (node) => node.className
      );

      const productInstance = new Product(
        1,
        "test",
        product_name,
        product_image,
        price,
        event_type
      );
      products.push(productInstance);
    }
    console.log("productElements : ", productElements.length);
    if (productElements.length != 8) {
      break;
    }

    const pagingContainer = await page.waitForSelector("div.paging");
    const lastPageBtn = await pagingContainer.waitForSelector("a.next");
    //html handler (solution)
    await page.evaluate((element) => {
      element.click();
    }, lastPageBtn);
    current_page++;
  }
  await browser.close();
  console.log("products : ", products.length);
  await sleep(2000);
};
