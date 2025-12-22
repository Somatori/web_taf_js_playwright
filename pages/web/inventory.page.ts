import { Page, expect } from '@playwright/test';

export class InventoryPage {
  static readonly PATH = '/inventory.html';

  constructor(private readonly page: Page) {}

  // ========== LOCATORS ==========
  private get inventoryList() {
    return this.page.locator('.inventory_list');
  }

  // ========== ACTIONS ==========
  async goto(): Promise<void> {
    await this.page.goto(InventoryPage.PATH);
  }

  // ========== ASSERTIONS ==========
  async assertInventoryPageAppears(): Promise<void> {
    // Wait for the inventory URL first
    await expect(this.page).toHaveURL(InventoryPage.PATH);

    // Assert a single, well-scoped element is visible.
    await expect(this.inventoryList).toBeVisible();
  }
}
