import { Page } from "@playwright/test";

export class UIMessage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
