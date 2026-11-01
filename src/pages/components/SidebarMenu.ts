import { Page } from "@playwright/test";

export class SidebarMenu {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
