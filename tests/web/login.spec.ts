import { test } from '@playwright/test';
import { PageManager } from '../../pages/web/_pageManager';

test.describe('Login', () => {
  test('successful login', { tag: '@smoke' }, async ({ page }) => {
    const pm = new PageManager(page);
    const username = process.env.SAUCEDEMO_USER;
    const password = process.env.SAUCEDEMO_PASSWORD;
    if (!username || !password) throw new Error('Missing credentials');

    await pm.login.goto();
    await pm.login.login(username, password);

    await pm.inventory.assertInventoryPageAppears();
  });

  test(
    'displaying an error message when logging in without credentials',
    { tag: '@smoke' },
    async ({ page }) => {
      const pm = new PageManager(page);
      await pm.login.goto();
      await pm.login.clickLoginButton();
      await pm.login.assertErrorMessageAppears('Epic sadface: Username is required');
    }
  );
});
