import { Page, Locator, expect } from "@playwright/test";
import { CommonPage } from "../CommonPage";
import { ToastType } from "../../support/types";

export class UIMessage extends CommonPage {
  // ----- Toast -----
  readonly toastContainer: Locator;
  readonly toast: Locator;
  readonly toastTitle: Locator;
  readonly toastMessage: Locator;
  readonly toastCloseButton: Locator;

  // ----- Confirm dialog -----
  readonly dialog: Locator;
  readonly dialogTitle: Locator;
  readonly dialogMessage: Locator;
  readonly dialogConfirmButton: Locator;
  readonly dialogCancelButton: Locator;

  // ----- Alert trong trang -----
  readonly alert: Locator;
  readonly alertMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.toastContainer = page.locator(".oxd-toast-container");
    this.toast = this.toastContainer.locator(".oxd-toast");
    this.toastTitle = this.toast.locator(".oxd-text--toast-title");
    this.toastMessage = this.toast.locator(".oxd-text--toast-message");
    this.toastCloseButton = this.toast.locator(".oxd-toast-close");

    this.dialog = page.locator(".orangehrm-dialog-popup");
    this.dialogTitle = this.dialog.locator(".orangehrm-modal-header");
    this.dialogMessage = this.dialog.locator(".orangehrm-text-center-align");
    this.dialogConfirmButton = this.dialog.getByRole("button", { name: "Yes" });
    this.dialogCancelButton = this.dialog.getByRole("button", { name: "No" });

    this.alert = page.locator(".oxd-alert");
    this.alertMessage = this.alert.locator(".oxd-alert-content-text");
  }
}
