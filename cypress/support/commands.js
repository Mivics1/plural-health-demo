import LoginPage from '../e2e/pageObjects/LoginPage';

Cypress.Commands.add('login', (username, password) => {
    // 1. Navigate to the base URL
    LoginPage.navigate();
    // 2. Type username
    LoginPage.typeUsername(username);
    // 3. Type password
    LoginPage.typePassword(password);
    // 4. Click login
    LoginPage.clickLogin();
});

// Convenience command to load credentials from fixtures by key and perform login
Cypress.Commands.add('loginAs', (userType) => {
  cy.fixture('credentials').then((creds) => {
    const user = creds[userType];

    if (!user) {
      throw new Error(`User type "${userType}" not found in credentials.json`);
    }

    cy.login(user.username, user.password);

  });
});
