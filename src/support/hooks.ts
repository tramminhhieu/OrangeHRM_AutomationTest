import {
  BeforeAll,
  AfterAll,
  Before,
  After,
  Status,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { chromium, Browser } from "@playwright/test";
import { config } from "./config";
import { CustomWorld } from "./world";

let browser: Browser;

// Timeout của Cucumber cho mỗi step (mặc định chỉ 5 giây, quá ngắn)
setDefaultTimeout(config.defaultTimeout * 2);

// Chạy 1 lần duy nhất trước toàn bộ test: mở browser
BeforeAll(async function () {
  browser = await chromium.launch({
    headless: config.headless,
    slowMo: config.slowMo,
  });
});

// Chạy trước mỗi scenario: tạo context và page mới
Before(async function (this: CustomWorld) {
  this.context = await browser.newContext({ baseURL: config.baseUrl });
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(config.defaultTimeout);
  this.initPages();
});

// Chạy sau mỗi scenario: chụp screenshot nếu fail, rồi đóng context
After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, "image/png");
  }
  await this.context?.close();
});

// Chạy 1 lần duy nhất sau toàn bộ test: đóng browser
AfterAll(async function () {
  await browser?.close();
});
