import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../e2e/pageObjects/LoginPage';

// --- Given Steps ---
Given('I am on the login page', () => {
    // Uses the dedicated POM method to navigate
    LoginPage.navigate();
});

// --- When Steps ---
When('I log in with valid credentials {string} and {string}', (username, password) => {
    // USES CUSTOM COMMAND: This is the most efficient and reusable way to handle login
    cy.login(username, password);
});

// --- Then Steps ---
Then('I should be redirected to the product inventory page', () => {
    // Assert on the URL or a unique element of the inventory page
    cy.url().should('include', '/inventory.html');
});

Then('I should see the product title {string}', (title) => {
    // Assert on the main header of the product page
    cy.get('.title').should('be.visible').and('have.text', title);
});

Then('I should see the error message {string}', (errorMessage) => {
    // Assert on the error message text using the POM selector
    LoginPage.getErrorMessage().should('be.visible').and('have.text', errorMessage);
});

Then('all product images should show the same image', () => {
    // This is the functional test for the 'problem_user' UI inconsistency
    
    // 1. Get all product image elements
    cy.get('.inventory_item_img img')
      .should('have.length.gt', 0) // Ensure products are present
      .then($images => {
        const firstSrc = $images.eq(0).attr('src');
        
        // 2. Iterate and assert that all sources match the first one
        $images.each((index, el) => {
            expect(Cypress.$(el).attr('src')).to.equal(firstSrc, `Image ${index + 1} source should match the first image.`);
        });
    });
});