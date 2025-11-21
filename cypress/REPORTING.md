# Reporting with Mochawesome

This project includes a lightweight reporting setup using Mochawesome.

What was added:

- npm scripts:
  - `npm run cypress:run:report` — runs all feature specs and generates a merged HTML report in `cypress/reports/mochawesome`.
  - `npm run cypress:run` — runs feature specs (existing).

- devDependencies required:
  - `mochawesome`, `mochawesome-merge`, `mochawesome-report-generator` (install with `npm install`)

How it works:

1. Run the tests with the Mochawesome reporter. Each spec will produce a JSON report in `cypress/reports/mochawesome`.
2. `mochawesome-merge` merges the JSON reports into a single `mochawesome.json`.
3. `marge` (from mochawesome-report-generator) generates an HTML report from the merged JSON.

Quick commands

Install dependencies (if you haven't already):

```bash
npm install
```

Run full test suite and generate the report:

```bash
npm run cypress:run:report
```

After the run completes, open the generated HTML report:

```bash
open cypress/reports/mochawesome/report.html
```

Notes

- The script uses `npx mochawesome-merge` and `npx marge` so you don't need global installs.
- You can customize reporter options by editing the `--reporter-options` in the `package.json` script.
- If you prefer JUnit XML for CI integrations, I can add a JUnit reporter script as well.

Allure Reporting
----------------

This project also supports generating an Allure dashboard. Steps to enable and use Allure:

1. Install the Allure plugin and CLI (dev dependencies were added to package.json):

```bash
npm install
```

2. Run your tests (they will produce `allure-results/`):

```bash
npm run cypress:run
```

3. Generate the Allure report and open it:

```bash
npm run allure:generate
npm run allure:open
```

Notes:
- The Allure plugin is registered in `cypress.config.js` and imported in `cypress/support/e2e.js`.
- Test artifacts (screenshots) and attachments can be added to Allure using the plugin APIs (e.g. `cy.allure().attachment(...)`).
- If the Allure CLI binary isn't available on your PATH, `allure-commandline` installed via npm will be used by `npx allure`.
