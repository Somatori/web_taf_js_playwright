import * as dotenv from 'dotenv';
dotenv.config();
import { defineConfig, devices, PlaywrightTestConfig } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'https://www.saucedemo.com';
const HEADLESS = (process.env.HEADLESS ?? 'true').toLowerCase() === 'true';
const SLOW_MO = process.env.SLOW_MO ? Number(process.env.SLOW_MO) : 0;
const TRACE = process.env.TRACE ?? 'retain-on-failure';
const VIDEO = process.env.VIDEO ?? 'retain-on-failure';
const SCREENSHOT = process.env.SCREENSHOT ?? 'only-on-failure';
const WORKERS = process.env.WORKERS ? Number(process.env.WORKERS) : undefined;

// CI and retries
const isCI = (process.env.CI ?? 'false').toLowerCase() === 'true';
// Parse RETRIES: if RETRIES is provided and a finite number, use it.
// Otherwise, use 2 when running in CI, and 0 locally.
let RETRIES: number;
if (process.env.RETRIES !== undefined && process.env.RETRIES !== '') {
  const n = Number(process.env.RETRIES);
  RETRIES = Number.isFinite(n) ? n : isCI ? 2 : 0;
} else {
  RETRIES = isCI ? 2 : 0;
}

// Build the 'use' options and cast to PlaywrightTestConfig['use'] once to satisfy types.
const useOptions = {
  baseURL: BASE_URL,
  actionTimeout: 0,
  navigationTimeout: 30_000,
  headless: HEADLESS,
  // pass slowMo to launchOptions when > 0
  launchOptions: SLOW_MO > 0 ? { slowMo: SLOW_MO } : undefined,
  // forward raw control values for trace/video/screenshot
  trace: TRACE,
  video: VIDEO,
  screenshot: SCREENSHOT,
} as unknown as PlaywrightTestConfig['use'];

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: isCI,
  retries: RETRIES,
  workers: Number.isFinite(Number(WORKERS)) ? WORKERS : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: useOptions,
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
