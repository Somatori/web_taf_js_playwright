import { test } from '../../fixtures/pageManagerFixture';
import { User } from '../../model/user';

test.beforeEach(async ({ pm }) => {
  const user = User.standardUser();

  await pm.login.goto();
  await pm.login.login(user.username, user.password);
});

test.describe('Inventory', () => {
  test('adding an item', { tag: '@sanity' }, async ({ pm }) => {
    const product_id = 'sauce-labs-backpack';
    await pm.inventory.addProductToCart(product_id);
    await pm.inventory.assertProductIsAdded(product_id);
  });
});
