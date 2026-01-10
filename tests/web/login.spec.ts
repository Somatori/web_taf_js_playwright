import { test } from '../../fixtures/pageManagerFixture';

test.describe('Login', () => {
  test('successful login', { tag: '@smoke' }, async ({ pm }) => {
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
    async ({ pm }) => {
      await pm.login.goto();
      await pm.login.clickLoginButton();
      await pm.login.assertErrorMessageAppears('Epic sadface: Username is required');
    }
  );
});
