const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  // e2e configuration for running BDD feature files
  e2e: {
    // Base URL for the application
    baseUrl: 'https://www.saucedemo.com/',
    // Spec pattern to look for feature files
    specPattern: 'cypress/e2e/features/**/*.feature',
    stepDefinitions: 'cypress/e2e/step_definitions/*.js',
    // Setup function to integrate BDD
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config,{
            loader: {'.js': 'jsx'},
          })],
        })
      );
      
      return config;
    },
    // Viewport settings for consistent testing
    viewportWidth: 1280,
    viewportHeight: 720,
    // Ensure Cypress handles uncaught exceptions gracefully
    experimentalStudio: true,
  },
});