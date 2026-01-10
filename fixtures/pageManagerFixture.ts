import { test as base } from '@playwright/test';
import { PageManager } from '../pages/web/_pageManager';

type PageManagerFixtures = {
  pm: PageManager;
};

export const test = base.extend<PageManagerFixtures>({
  pm: async ({ page }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  },
});
