import puppeteer from "puppeteer";

export default async () => {
  const events = [];
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(
    "http://gs25.gsretail.com/gscvs/ko/customer-engagement/event/current-events"
  );

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  const trElements = await page.$$("table.evt_list > tbody > tr");
  const pageIndex = new Set();

  let aElement = await page.$("a.next");
  await Promise.all(
    trElements.map(async (tr) => {
      const tds = await tr.$$("td");
      const index = await tds[0].evaluate((node) => node.textContent.trim());
      pageIndex.add(index);
      // 2번째 td 안에 있는 a 태그의 img 태그의 src 속성 가져오기
      const secondTd = tds[1];
      const thirdTd = tds[2];

      const imgElement = await secondTd.$("a img");
      const imgSrc = imgElement
        ? await imgElement.evaluate((node) => node.src)
        : null;

      // 3번째 td 안에 있는 p 태그의 첫 번째 자식인 span 태그의 텍스트 가져오기
      const spanElement = await thirdTd.$("p:first-child span");
      const onOffLine = spanElement
        ? await spanElement.evaluate((node) => node.textContent)
        : null;

      // 3번째 td 안에 있는 p 태그의 두 번째 자식인 a 태그의 href 속성 가져오기
      const aElement = await thirdTd.$("p:nth-child(2) a");
      const href = aElement
        ? await aElement.evaluate((node) => node.href)
        : null;

      const title = aElement
        ? await aElement.evaluate((node) => node.textContent)
        : null;

      const event = { index, imgSrc, onOffLine, title, href };
      events.push(event);
    })
  );

  await page.locator("a.next").click();
  const trElements2 = await page.$$("table.evt_list > tbody > tr");

  console.log("trElements2 : ", trElements2.length);
  await browser.close();
  return events || [];
};
