import { test } from '@playwright/test';
import { LoginPage } from '../../pages/web/login.page';
import { InventoryPage } from '../../pages/web/inventory.page';

test.describe('Login', () => {
  test('successful login', async ({ page }) => {
    const username = process.env.SAUCEDEMO_USER;
    const password = process.env.SAUCEDEMO_PASSWORD;
    if (!username || !password) throw new Error('Missing credentials');

    const login = new LoginPage(page);
    await login.goto();
    await login.login(username, password);

    const inventory = new InventoryPage(page);
    await inventory.assertInventoryPageAppears();
  });

  test('displaying an error message when logging in without credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.clickLoginButton();

    await login.assertErrorMessageAppears('Epic sadface: Username is required');
  });
});
