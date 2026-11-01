import { World, IWorldOptions, setWorldConstructor } from "@cucumber/cucumber";
import { BrowserContext, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { SidebarMenu } from "../pages/components/SidebarMenu";
import { UIMessage } from "../pages/components/UIMessage";
import { AddEmployeePage } from "../pages/pim/AddEmployeePage";
import { DetailEmployeePage } from "../pages/pim/DetailEmployeePage";
import { ListEmployeePage } from "../pages/pim/ListEmployeePage";

export class CustomWorld extends World {
  context!: BrowserContext;
  page!: Page;

  // Page Objects
  loginPage!: LoginPage;
  sidebarMenu!: SidebarMenu;
  uiMessage!: UIMessage;
  addEmployeePage!: AddEmployeePage;
  detailEmployeePage!: DetailEmployeePage;
  listEmployeePage!: ListEmployeePage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  // Khởi tạo tất cả Page Object sau khi đã có page
  initPages() {
    this.loginPage = new LoginPage(this.page);
    this.sidebarMenu = new SidebarMenu(this.page);
    this.uiMessage = new UIMessage(this.page);
    this.addEmployeePage = new AddEmployeePage(this.page);
    this.detailEmployeePage = new DetailEmployeePage(this.page);
    this.listEmployeePage = new ListEmployeePage(this.page);
  }
}

setWorldConstructor(CustomWorld);
