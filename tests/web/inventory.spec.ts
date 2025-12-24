import { test } from '@playwright/test';
import { LoginPage } from '../../pages/web/login.page';
import { InventoryPage } from '../../pages/web/inventory.page';

test.beforeEach(async ({ page }) => {
  const username = process.env.SAUCEDEMO_USER;
  const password = process.env.SAUCEDEMO_PASSWORD;
  if (!username || !password) throw new Error('Missing credentials');

  const login = new LoginPage(page);
  await login.goto();
  await login.login(username, password);
});

test.describe('Inventory', () => {
  test('adding an item', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const product_id = 'sauce-labs-backpack';
    await inventory.addProductToCart(product_id);
    await inventory.assertProductIsAdded(product_id);
  });
});
