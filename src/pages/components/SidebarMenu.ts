import { Page, Locator, expect } from "@playwright/test";
import { CommonPage } from "../CommonPage";

export class SidebarMenu extends CommonPage {
  // Locator tĩnh
  readonly sidebar: Locator;
  readonly menu: Locator;

  //Menu chỉ Admin mới nhìn thấy
  readonly adminOnlyMenus = ["Admin", "PIM"];

  constructor(page: Page) {
    super(page);
    this.sidebar = page.locator("aside");
    this.menu = this.sidebar.locator(".oxd-main-menu");
  }

  // ===== Locator động =====
  menuItem(name: string): Locator {
    return this.menu.getByRole("link", { name, exact: true });
  }

  // ===== Hành động =====
  async waitForLoaded() {
    await this.menuItem("Dashboard").waitFor({ state: "visible" });
  }

  async clickMenu(name: string) {
    await this.clickByLocator(this.menuItem(name));
  }

  // ===== Verify =====
  async verifyLoginAdmin() {
    await this.waitForLoaded();
    for (const menu of this.adminOnlyMenus) {
      await expect(this.menuItem(menu)).toBeVisible();
    }
  }

  async verifyLoginEmployee() {
    await this.waitForLoaded();
    for (const menu of this.adminOnlyMenus) {
      await expect(this.menuItem(menu)).toHaveCount(0);
    }
    await expect(this.menuItem("My Info")).toBeVisible();
  }
}
