import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/web/login.page';
import { InventoryPage } from '../../pages/web/inventory.page';

export class PageManager {
  private readonly page: Page;
  private readonly loginPage: LoginPage;
  private readonly inventoryPage: InventoryPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
  }

  login() {
    return this.loginPage;
  }

  inventory() {
    return this.inventoryPage;
  }
}
