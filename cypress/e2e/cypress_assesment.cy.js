// cypress/support/commands.js
Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-test="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
  });
  
  describe('Login Session Management', () => {
    const credentials = { username: 'standard_user', invalidPassword: 'secret', validPassword: 'secret_sauce' };
  
    beforeEach(() => {
      cy.visit("https://www.saucedemo.com/");
    });
  
    it('should verify that the user is redirected to the correct URL', () => {
      cy.url().should('contain', 'saucedemo');
      cy.title().should('eq', 'Swag Labs');
    });
  
    it('should show an error message for invalid login', () => {
      cy.login(credentials.username, credentials.invalidPassword);
      cy.get('[data-test="error-button"]').should('exist');
    });
  
    it('should login successfully with valid credentials', () => {
      cy.login(credentials.username, credentials.validPassword);
      cy.url().should('contain', 'inventory');
    });
  
    it('should add an item to the cart and verify it', () => {
      cy.login(credentials.username, credentials.validPassword);
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('[data-test="remove-sauce-labs-backpack"]').should('exist');
    });
  
    it('should verify that the item is in the cart', () => {
      cy.login(credentials.username, credentials.validPassword);
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('[data-test="shopping-cart-link"]').click();
      cy.get('[data-test="inventory-item-name"]').should('exist');
    });
  });
  