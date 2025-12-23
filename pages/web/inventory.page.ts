import { Page, expect } from '@playwright/test';

export class InventoryPage {
  static readonly PATH = '/inventory.html';

  constructor(private readonly page: Page) {}

  // ========== LOCATORS ==========
  private get inventoryList() {
    return this.page.locator('.inventory_list');
  }
  private getProductAddButton(product_id: string) {
    return this.page.locator(`[data-test='add-to-cart-${product_id}']`);
  }

  private getProductRemoveButton(product_id: string) {
    return this.page.locator(`[data-test='remove-${product_id}']`);
  }

  // ========== ACTIONS ==========
  async goto(): Promise<void> {
    await this.page.goto(InventoryPage.PATH);
  }

  async addProductToCart(product_id: string): Promise<void> {
    await this.getProductAddButton(product_id).click();
  }

  // ========== ASSERTIONS ==========
  async assertInventoryPageAppears(): Promise<void> {
    // Wait for the inventory URL first
    await expect(this.page).toHaveURL(InventoryPage.PATH);

    // Assert a single, well-scoped element is visible.
    await expect(this.inventoryList).toBeVisible();
  }

  async assertProductIsAdded(product_id: string): Promise<void> {
    // The 'remove' button is visible for the product
    await expect(this.getProductRemoveButton(product_id)).toBeVisible();
  }
}
