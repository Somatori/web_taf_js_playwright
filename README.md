# Playwright TypeScript TAF (saucedemo)

This repository contains a Playwright Test + TypeScript test automation framework starter project layout.
Base URL: https://www.saucedemo.com

Directory layout:

- pages/ Page Object classes
- tests/ Playwright test files
- fixtures/ shared test fixtures (custom)
- helpers/ utility helpers
- configs/ optional config files (test data, env maps)
- model/ domain models / test data builders

Configs:

- playwright.config.ts Playwright Test configuration
- tsconfig.json TypeScript compiler settings

Run tests:

- `npx playwright test`
- `npx playwright show-report` (open HTML report)
