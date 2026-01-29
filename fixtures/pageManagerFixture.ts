import { test as base } from '@playwright/test';
import { PageManager } from '../pages/_pageManager';

type PageManagerFixtures = {
  pm: PageManager;
};

export const test = base.extend<PageManagerFixtures>({
  pm: async ({ page }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  },
});
