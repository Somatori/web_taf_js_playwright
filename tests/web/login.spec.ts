// import assert from 'assert';
import { test } from '@playwright/test';
import { LoginPage } from '../../pages/web/login.page';
import { InventoryPage } from '../../pages/web/inventory.page';

test.describe('SauceDemo — Login', () => {
  test('standard user can login (happy path)', async ({ page }) => {
    const username = process.env.SAUCEDEMO_USER;
    const password = process.env.SAUCEDEMO_PASSWORD;

    if (!username || !password) {
      throw new Error(
        'Missing credentials. Set SAUCEDEMO_USER and SAUCEDEMO_PASSWORD in your environment or .env file.'
      );
    }

    const login = new LoginPage(page);
    await login.goto();
    await login.login(username, password);

    const inventory = new InventoryPage(page);
    await inventory.assertInventoryPageAppears();
  });
});
