import { test } from '../fixtures/pageManagerFixture';
import { User } from '../model/user';

test.describe('Login', () => {
  test('successful login', { tag: '@smoke' }, async ({ pm }) => {
    const user = User.standardUser();

    await pm.login.goto();
    await pm.login.login(user.username, user.password);

    await pm.inventory.assertInventoryPageAppears();
  });

  test(
    'displaying an error message when logging in without credentials',
    { tag: '@smoke' },
    async ({ pm }) => {
      await pm.login.goto();
      await pm.login.clickLoginButton();
      await pm.login.assertErrorMessageAppears('Epic sadface: Username is required');
    }
  );
});
