A small, generic end-to-end Test Automation Framework (TAF) for web UI testing using **Javascript/Typescript** and **Playwright**.  
Tests are written using the **Page Object Model** (POM) and run by Playwright Test runner. CI uses GitHub Actions to run tests, retain artifacts, and publish the HTML report to GitHub Pages.

## Prerequisites

- Node.js (recommended v18+ or the version used in CI; local Node v22 is supported)
- npm
- VS Code (recommended) with the Playwright extension, ESLint and Prettier (optional but recommended)

## Setup

1. Clone the repo:

```bash
git clone https://github.com/Somatori/web_taf_js_playwright.git
cd web_taf_js_playwright
```

2. Install dependencies and Playwright browsers:

```bash
npm ci
npx playwright install
```

3. Copy example environment file and edit it:

```bash
cp .env.example .env
# edit .env to set local values, including SAUCEDEMO_USER/SAUCEDEMO_PASSWORD if needed
```

## Environment variables (`.env`)

The config reads values from `.env`. Sensible defaults are used when variables are missing.

Key variables:

```
BASE_URL=https://www.saucedemo.com
HEADLESS=true                # "true" or "false" (if false, browsers run headed)
SLOW_MO=0                    # ms of slow-motion (0 disables)
BROWSER_WIDTH=1680
BROWSER_HEIGHT=1050
TRACE=retain-on-failure      # trace mode: 'off'|'on'|'on-first-retry'|'retain-on-failure' etc.
VIDEO=on                     # 'off'|'on'|'retain-on-failure'|'on-first-retry'
SCREENSHOT=only-on-failure   # 'off'|'on'|'only-on-failure'|'on-first-failure'
WORKERS=3                    # optional — Playwright auto-detects if empty
RETRIES=                     # optional — CI defaults to 2, local defaults to 0
CI=false                     # set to 'true' in CI automatically; use to emulate CI locally
# Secrets (used in CI) — add them in GitHub repository Settings → Secrets
SAUCEDEMO_USER=...
SAUCEDEMO_PASSWORD=...
```

> The project ships a `.env.example` with these variables — copy it to `.env` and customize locally.

## Playwright CLI commands and NPM scripts (examples)

### Run tests in a single browser (Chromium)

```bash
npx playwright test --project=chromium
# or use npm script
npm run c
```

### Run tests in a single browser and in headed mode (browser visible)

```bash
npx playwright test --project=chromium --headed
# or use npm script
npm run c-h
```

### Run all tests (default project matrix)

```bash
npx playwright test
# or use npm script
npm run all
```

### Run a single test file

```bash
npx playwright test tests/web/login.spec.ts
```

### Run a single test by title (grep)

The suite uses title-based tags — to run a specific test by exact title or a substring:

```bash
# run tests whose title matches the quoted text
npx playwright test -g "standard user can login"
```

### Run only failed tests (rerun)

If you previously ran tests and want to rerun only the failed ones (Playwright persists last-run information):

```bash
npx playwright test --only-failed
```

### Repeat each test 5 times

```bash
npx playwright test --repeat-each=5
# or use npm script
npm run repeat-5
```

### Show report of the last test run

```bash
npx playwright show-report
# or use npm script
npm run report
```

### Open a trace file

```bash
npx playwright show-trace /path/to/your/trace.zip
```

### Open the Playwright UI test runner mode

```bash
npx playwright test --ui
# or use npm script
npm run ui
```

### Run tests in the Playwright debug mode (in Chromium)

```bash
npx playwright test --project=chromium --debug
# or use npm script
npm run debug
```

## Tags / categories

To categorize tests, add the `tag` to each test.  
Example:

```ts
test('successful login', { tag: '@smoke' }, async ({ page }) => { ... });
```

To run tests by category (in Chromium):

```bash
npx playwright test --project=chromium --grep @smoke
```

## Reports, traces and videos

- Playwright automatically writes:
  - `playwright-report/` — HTML report (use `npx playwright show-report` to view locally)
  - `test-results/` — raw artifacts: screenshots, traces (.zip), videos (.webm)

- Configure recording policy using `.env`:
  - `TRACE=retain-on-failure` or `on-first-retry` etc.
  - `VIDEO=on` or `retain-on-failure`
  - `SCREENSHOT=only-on-failure`

- In CI the workflow uploads both `playwright-report` and `test-results` artifacts so you can download and inspect them. The workflow also publishes the HTML report to GitHub Pages.

## Lint & Prettier

Install the recommended VS Code extensions:

- Playwright Test for VS Code (`ms-playwright.playwright`)
- ESLint
- Prettier — Code formatter

Commands:

```bash
# lint (errors will fail with --max-warnings=0)
npm run lint

# auto-fix lintable problems
npm run lint:fix

# format files with Prettier
npm run format
```

Recommended editor settings (workspace `.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["typescript", "typescriptreact"]
}
```

## CI: GitHub Actions (what we run)

Workflow file: `.github/workflows/ci.yml`  
Key behavior:

- Runs on `push` / PR / manual dispatch.
- Uses `actions/setup-node` to install Node.
- Installs deps (`npm ci`) and Playwright browsers (`npx playwright install --with-deps`).
- Runs tests with 2 workers and `RETRIES=1` (CI env sets `CI=true`, `WORKERS=2`, `RETRIES=1`).
- CI env sets `TRACE`, `VIDEO`, `SCREENSHOT` according to repo defaults (see `.github/workflows/ci.yml`).
- Uploads artifacts:
  - `playwright-report` (HTML)
  - `test-results` (videos, traces, screenshots)
- Publishes `playwright-report` to GitHub Pages (`gh-pages`) so the HTML report can be viewed publicly.
- CI expects repository secrets:
  - `SAUCEDEMO_USER`
  - `SAUCEDEMO_PASSWORD`
    (Set these in repo Settings → Secrets.)

> If the publish step fails, check workflow permissions in the workflow header: the job needs `permissions.contents: write` to push to `gh-pages`.
