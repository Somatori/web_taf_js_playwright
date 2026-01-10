import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/web/login.page';
import { InventoryPage } from '../../pages/web/inventory.page';

export class PageManager {
  constructor(private readonly page: Page) {}

  // private caches
  private _login?: LoginPage;
  private _inventory?: InventoryPage;

  // getter properties (lazy + concise)
  get login(): LoginPage {
    return (this._login ??= new LoginPage(this.page));
  }

  get inventory(): InventoryPage {
    return (this._inventory ??= new InventoryPage(this.page));
  }
}
