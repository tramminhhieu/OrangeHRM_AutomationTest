import { Page } from "@playwright/test";

export class AddEmployeePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
