class LoginPage {
    
    // Selectors
    getUsernameField() {
        return cy.get('#user-name');
    }

    getPasswordField() {
        return cy.get('#password');
    }

    getLoginButton() {
        return cy.get('#login-button');
    }

    getErrorMessage() {
        return cy.get('h3[data-test="error"]');
    }

    // Actions
    navigate() {
        cy.visit('/');
    }

    typeUsername(username) {
        this.getUsernameField().type(username);
    }

    typePassword(password) {
        this.getPasswordField().type(password);
    }

    clickLogin() {
        this.getLoginButton().click();
    }
}

export default new LoginPage();