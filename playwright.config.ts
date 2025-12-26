import * as dotenv from 'dotenv';
dotenv.config();

import {
  defineConfig,
  devices,
  TraceMode,
  VideoMode,
  ScreenshotMode,
  ViewportSize,
} from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'https://www.saucedemo.com';
const HEADLESS = (process.env.HEADLESS ?? 'true').toLowerCase() === 'true';
const SLOW_MO = process.env.SLOW_MO ? Number(process.env.SLOW_MO) : 0;

const BROWSER_WIDTH = process.env.BROWSER_WIDTH ? Number(process.env.BROWSER_WIDTH) : 1280;
const BROWSER_HEIGHT = process.env.BROWSER_HEIGHT ? Number(process.env.BROWSER_HEIGHT) : 720;

const TRACE = process.env.TRACE ?? 'on-first-retry';
const VIDEO = process.env.VIDEO ?? 'retain-on-failure';
const SCREENSHOT = process.env.SCREENSHOT ?? 'only-on-failure';

const WORKERS = process.env.WORKERS ? Number(process.env.WORKERS) : undefined;

const isCI = (process.env.CI ?? 'false').toLowerCase() === 'true';
let RETRIES: number;
if (process.env.RETRIES !== undefined && process.env.RETRIES !== '') {
  const n = Number(process.env.RETRIES);
  RETRIES = Number.isFinite(n) ? n : isCI ? 2 : 0;
} else {
  RETRIES = isCI ? 2 : 0;
}

// viewport/video size object used below
const VIEWPORT_SIZE: ViewportSize = {
  width: BROWSER_WIDTH,
  height: BROWSER_HEIGHT,
};

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: isCI,
  retries: RETRIES,
  workers: WORKERS,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    actionTimeout: 0,
    navigationTimeout: 30_000,

    headless: HEADLESS,
    launchOptions: SLOW_MO > 0 ? { slowMo: SLOW_MO } : undefined,

    trace: TRACE as unknown as TraceMode,
    video: VIDEO as unknown as VideoMode,
    screenshot: SCREENSHOT as unknown as ScreenshotMode,

    // global defaults (will be overridden per-project by device spread + explicit viewport below)
    viewport: VIEWPORT_SIZE,

    // ensure recorded videos are written to a predictable location and match viewport
    contextOptions: {
      recordVideo: {
        dir: 'test-results/videos',
        size: VIEWPORT_SIZE,
      },
    },
  },

  // override device defaults so viewport/video size from env is applied
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: VIEWPORT_SIZE,
        contextOptions: {
          recordVideo: { dir: 'test-results/videos', size: VIEWPORT_SIZE },
        },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: VIEWPORT_SIZE,
        contextOptions: {
          recordVideo: { dir: 'test-results/videos', size: VIEWPORT_SIZE },
        },
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: VIEWPORT_SIZE,
        contextOptions: {
          recordVideo: { dir: 'test-results/videos', size: VIEWPORT_SIZE },
        },
      },
    },
  ],
});
