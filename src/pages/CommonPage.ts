import { Page, Locator, expect } from "@playwright/test";

export class CommonPage {
  readonly page: Page;
  readonly loadingSpinner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loadingSpinner = page.locator(".oxd-loading-spinner");
  }

  // ===== Hàm hỗ trợ nội bộ =====
  // Thoát ký tự đặc biệt để dùng chuỗi trong RegExp
  private escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Tìm khối input-group có label khớp CHÍNH XÁC
  private inputGroup(label: string): Locator {
    const exactLabel = new RegExp(`^\\s*${this.escapeRegex(label)}\\s*$`);
    return this.page.locator(".oxd-input-group").filter({
      has: this.page.locator("label", { hasText: exactLabel }),
    });
  }

  // ===== Locator động =====
  // Tìm field theo label HOẶC placeholder
  fieldByText(text: string): Locator {
    const byLabel = this.inputGroup(text).locator("input, textarea");
    const byPlaceholder = this.page.getByPlaceholder(text, { exact: true });
    return byLabel.or(byPlaceholder).filter({ visible: true });
  }

  // Thông báo lỗi dưới một field (tìm theo label)
  fieldError(label: string): Locator {
    return this.inputGroup(label).locator(".oxd-input-field-error-message");
  }

  // ===== Hành động =====
  async waitForLoading() {
    await expect(this.loadingSpinner).toHaveCount(0);
  }

  async goToUrl(path: string) {
    await this.page.goto(path);
    await this.waitForLoading();
  }

  async clickByText(text: string, exact: boolean = true) {
    await this.page
      .getByText(text, { exact })
      .filter({ visible: true })
      .click();
    await this.waitForLoading();
  }

  async clickByLocator(locator: Locator) {
    await locator.click();
    await this.waitForLoading();
  }

  async fillFieldByText(text: string, value: string) {
    await this.fieldByText(text).fill(value);
  }

  async fillFieldByLocator(locator: Locator, value: string) {
    await locator.fill(value);
  }

  async toggle(wrapper: Locator, enable: boolean) {
    const checkbox = wrapper.locator('input[type="checkbox"]');
    if ((await checkbox.isChecked()) !== enable) {
      await wrapper.locator(".oxd-switch-input").click();
    }
  }

  async uploadFile(input: Locator, filePath: string) {
    await input.setInputFiles(filePath);
  }

  // ===== Verify =====
  async verifyUrl(path: string) {
    await expect(this.page).toHaveURL(new RegExp(this.escapeRegex(path)));
  }

  async verifyByText(text: string) {
    await expect(
      this.page.getByText(text, { exact: true }).first(),
    ).toBeVisible();
  }
}
