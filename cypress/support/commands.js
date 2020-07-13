// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loginAsUser', () => {
  cy.visit('/login');
  cy.get('input[type=checkbox]').uncheck({ force: true });
  cy.get('form').submit();

  cy.url()
    .should('include', '/courses')
    .then(() => {
      expect(localStorage.getItem('auth_user')).to.exist;

      const authUser = JSON.parse(localStorage.getItem('auth_user'));
      expect(authUser).to.deep.equal({
        email: 'show_courses@test.com',
        userType: 0,
        photoUrl: null,
      });
    });
});

Cypress.Commands.add('logout', () => {
  cy.visit('/courses');
  cy.url().should('include', '/courses');

  cy.get('.navigation-items').contains('Logout').click();

  cy.url()
    .should('include', '/welcome')
    .then(() => {
      expect(localStorage.getItem('auth_user')).to.not.exist;
    });
});
