import { Page } from "@playwright/test";

export class DetailEmployeePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
