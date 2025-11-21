import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../e2e/pageObjects/LoginPage';

Given('I am on the login page', () => {
  LoginPage.navigate();
});

When('I log in as {string}', (userType) => {
  cy.loginAs(userType);
});

Then('I should be redirected to the product inventory page', () => {
  cy.url().should('include', '/inventory.html');
  cy.get('.inventory_list').should('be.visible');
});

Then('I should see the product title {string}', (title) => {
  cy.get('.title').should('be.visible').and('have.text', title);
});

Then('I should see the error message {string}', (errorMessage) => {
  LoginPage.getErrorMessage().should('be.visible').and('have.text', errorMessage);
});

Then('all product images should show the same image', () => {
  cy.get('.inventory_item_img img')
    .should('have.length.gt', 0)
    .then(($images) => {
      const firstSrc = $images.eq(0).attr('src');
      $images.each((index, el) => {
        expect(Cypress.$(el).attr('src')).to.equal(
          firstSrc,
          `Image ${index + 1} source should match the first image.`
        );
      });
    });
});