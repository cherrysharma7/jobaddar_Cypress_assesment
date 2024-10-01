// cypress/support/commands.js
Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-test="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
  });
  
  describe('assesment', () => {
    const credentials = { username: 'standard_user', invalidPassword: 'secret', validPassword: 'secret_sauce' };
  
    beforeEach(() => {
      cy.visit("https://www.saucedemo.com/"); // url for the website
    });
  
    it('should verify that the user is redirected to the correct URL', () => {
        // Assetion for Url should contain saucedemo
      cy.url().should('contain', 'saucedemo');
      // Assertion for the title of the page
      cy.title().should('eq', 'Swag Labs');
    });
  
    it('should show an error message for invalid login', () => {
      cy.login(credentials.username, credentials.invalidPassword);
      // Assertion after entering invalid username & password
      cy.get('[data-test="error-button"]').should('exist');
    });
  
    it('should login successfully with valid credentials', () => {
      cy.login(credentials.username, credentials.validPassword);
      // Assertion to verify URL after login
      cy.url().should('contain', 'inventory');
    });
  
    it('should add an item to the cart and verify it', () => {
      cy.login(credentials.username, credentials.validPassword);
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      // Assertion to make sure the added item got remove button
      cy.get('[data-test="remove-sauce-labs-backpack"]').should('exist');
    });
  
    it('should verify that the item is in the cart', () => {
      cy.login(credentials.username, credentials.validPassword);
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      // Clicking on the top right icon
      cy.get('[data-test="shopping-cart-link"]').click();
      // Assertion that the item is successfully added
      cy.get('[data-test="inventory-item-name"]').should('exist');
    });
  });
  