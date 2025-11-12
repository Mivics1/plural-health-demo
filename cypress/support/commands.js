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
