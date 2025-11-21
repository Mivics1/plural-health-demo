const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
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
    // ========================
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'mochawesome-report/json',
      overwrite: false,
      html: false,
      json: true,
      charts: true,
    },

    // ========================
    // Display Settings
    // ========================
    viewportWidth: 1280,
    viewportHeight: 720,

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

      return config;
    },
  },
});