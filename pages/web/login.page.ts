import { Page, expect } from '@playwright/test';

/**
 * LoginPage — Page Object for https://www.saucedemo.com
 */
export class LoginPage {
  constructor(private readonly page: Page) {}

  // Static locators (getters)
  private get username() {
    return this.page.locator('#user-name');
  }
  private get password() {
    return this.page.locator('#password');
  }
  private get submitButton() {
    return this.page.locator('#login-button');
  }
  private get loginForm() {
    return this.page.locator('form');
  }
  private inventoryContainer() {
    return this.page.locator('[data-test="inventory-container"]');
  }

  // // Dynamic locator factory example
  // getInventoryItemByName(name: string) {
  //   return this.page.locator(`.inventory_item:has-text("${name}")`);
  // }

  // Actions
  async goto(): Promise<void> {
    await this.page.goto('/');
    await expect(this.loginForm).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submitButton.click();
  }

  // Assertions
  async expectLoggedIn(): Promise<void> {
    // Wait for the inventory URL first
    await this.page.waitForURL(/.*inventory\.html/, { timeout: 10_000 });

    // Assert a single, well-scoped element is visible.
    await expect(this.inventoryContainer()).toBeVisible();
  }
}
