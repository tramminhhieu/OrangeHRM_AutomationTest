import { Page } from "@playwright/test";

export class ListEmployeePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
