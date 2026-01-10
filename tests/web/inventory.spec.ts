import { test } from '../../fixtures/pageManagerFixture';

test.beforeEach(async ({ pm }) => {
  const username = process.env.SAUCEDEMO_USER;
  const password = process.env.SAUCEDEMO_PASSWORD;
  if (!username || !password) throw new Error('Missing credentials');

  await pm.login.goto();
  await pm.login.login(username, password);
});

test.describe('Inventory', () => {
  test('adding an item', { tag: '@sanity' }, async ({ pm }) => {
    const product_id = 'sauce-labs-backpack';
    await pm.inventory.addProductToCart(product_id);
    await pm.inventory.assertProductIsAdded(product_id);
  });
});
