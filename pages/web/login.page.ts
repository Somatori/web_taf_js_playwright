import { Page, expect } from '@playwright/test';
// import { Page } from '@playwright/test';

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
  private get errorMessageArea() {
    return this.page.locator('div#login_button_container div.error-message-container.error');
  }
  // private get errorMessageCaption() {
  //   return this.errorMessageContainer.locator('h3');
  // }

  // ========== ACTIONS ==========
  async goto(): Promise<void> {
    await this.page.goto(LoginPage.PATH);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    this.clickLoginButton();
  }

  async getErrorMessageText() {
    return this.errorMessageArea.innerText();
  }

  // ========== ASSERTIONS ==========
  async assertErrorMessageAppears(): Promise<void> {
    await expect(this.errorMessageArea).toBeVisible();
  }
}
