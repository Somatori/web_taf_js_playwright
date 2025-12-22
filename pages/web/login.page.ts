// import { Page, expect } from '@playwright/test';
import { Page } from '@playwright/test';

export class LoginPage {
  static readonly PATH = '/';

  constructor(private readonly page: Page) {}

  // ========== LOCATORS ==========
  private get usernameInput() {
    return this.page.locator('input#user-name');
  }
  private get passwordInput() {
    return this.page.locator('input#password');
  }
  private get loginButton() {
    return this.page.locator('input#login-button');
  }

  // ========== DYNAMIC LOCATORS ==========
  // getInventoryItemByName(name: string) {
  //   return this.page.locator(`.inventory_item:has-text("${name}")`);
  // }

  // ========== ACTIONS ==========
  async goto(): Promise<void> {
    await this.page.goto(LoginPage.PATH);
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // ========== ASSERTIONS ==========
}
