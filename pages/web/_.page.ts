// import { Page, expect } from '@playwright/test';
import { Page } from '@playwright/test';

export class _Page {
  static readonly PATH = '/...';

  constructor(private readonly page: Page) {}

  // ========== LOCATORS ==========
  // static locator example
  // private get usernameInput() {
  //   return this.page.locator('input#user-name');
  // }
  // dynamic locator example
  // getInventoryItemByName(name: string) {
  //   return this.page.locator(`.inventory_item:has-text("${name}")`);
  // }

  // ========== ACTIONS ==========
  async goto(): Promise<void> {
    await this.page.goto(_Page.PATH);
  }

  // ========== ASSERTIONS ==========
}
