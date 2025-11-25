const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  // Mochawesome Reporter Configuration (top-level)
  // Use require.resolve to point directly at the reporter entry file. This avoids
  // indirect resolution issues where the reporter may be interpreted as an object.
  reporter: require.resolve('mochawesome'),
  reporterOptions: {
    reportDir: 'mochawesome-report/json',
    overwrite: false,
    html: false,
    json: true,
    charts: true,
  },
  e2e: {
    // ========================
    // Application Configuration
    // ========================
    baseUrl: 'https://www.saucedemo.com/',

    // ========================
    // BDD Feature Files
    // ========================
    specPattern: 'cypress/e2e/features/**/*.feature',
    stepDefinitions: 'cypress/**/step_definitions/*.js',

    // ========================
    // Environment Variables
    // ========================
    env: {},

    // ========================
    // Mochawesome Reporter Configuration
    // NOTE: reporter settings are set at the top-level config below (outside `e2e`) to avoid
    // occasional reporter resolution issues depending on how Cypress is invoked.

    // ========================
    // Display Settings
    // ========================
    viewportWidth: 1280, //375
    viewportHeight: 720, //812

    // ========================
    // Timing Settings
    // ========================
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,

    // ========================
    // Node Event Handlers
    // ========================
    async setupNodeEvents(on, config) {
      // Add Cucumber preprocessor plugin
      await addCucumberPreprocessorPlugin(on, config);

      // Configure esbuild bundler for feature files
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // eslint-disable-next-line no-console
      console.log('\n✓ Cypress configured:');
      console.log('  ✓ Cucumber BDD tests enabled');
      console.log('  ✓ Mochawesome reporting enabled');
      console.log('  ✓ ESBuild bundler active\n');

  // Debug: print reporter config to troubleshoot reporter issues
  // (helps verify whether reporter is being overridden or malformed)
  // eslint-disable-next-line no-console
  console.log('Cypress config reporter:', config.reporter);
  // eslint-disable-next-line no-console
  console.log('Cypress config reporterOptions type:', typeof config.reporterOptions);

      return config;
    },
  },
});