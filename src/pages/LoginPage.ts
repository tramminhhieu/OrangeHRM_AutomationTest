import { Page, Locator, expect } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class LoginPage extends CommonPage {
  readonly url = "/web/index.php/auth/login";

  // Locator tĩnh
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly alertMessage: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.alertMessage = page.locator(".oxd-alert-content-text");
    this.forgotPasswordLink = page.getByText("Forgot your password?", {
      exact: true,
    });
  }

  // ===== Hành động =====
  async goto() {
    await this.goToUrl(this.url);
  }

  async login(username: string, password: string) {
    await this.fillFieldByLocator(this.usernameInput, username);
    await this.fillFieldByLocator(this.passwordInput, password);
    await this.clickByLocator(this.loginButton);
  }

  async clickForgotPassword() {
    await this.clickByLocator(this.forgotPasswordLink);
  }

  // ===== Verify =====
  async verifyOnLoginPage() {
    await this.verifyUrl("/auth/login");
    await expect(this.loginButton).toBeVisible();
  }

  async verifyLoginSuccess() {
    await this.verifyUrl("/dashboard");
  }

  async verifyAlertMessage(message: string) {
    await expect(this.alertMessage).toHaveText(message);
  }

  async verifyFieldError(label: string, message: string) {
    await expect(this.fieldError(label)).toHaveText(message);
  }
}
