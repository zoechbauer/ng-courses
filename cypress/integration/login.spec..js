// type definitions for Cypress object "cy"
/// <reference types="cypress" />

const { stringify } = require('querystring');

describe('Login Page', () => {

  beforeEach(() => {
    cy.visit('/login');
  })

  it('should be filled with default values', () => {
    cy.get('input[type=email').should('have.value', 'show_courses@test.com');
    cy.get('input[type=password]').should('have.value', 'display#courses');
    cy.get('input[type=password]').should('be.visible');

    cy.get('input[type=checkbox]')
      .check()
      .should('be.checked')
      .and('not.be.disabled');
  });

  it('should display edit-courses form after login as admin', ()=> {
    cy.get('input[type=checkbox]').check();

    cy.get('form').submit().then(() => {
      cy.url().should('include', '/courses/edit'))
  })

  it('should display courses-list after login as user', (() => {
    cy.get('input[type=checkbox]').uncheck({force: true})

    cy.get('form').submit().then(() => {
      cy.url().should('contain', '/courses')
        .and('not.contain', '/courses/edit')
    })
  }))

  it('should disable login button  if field is empty or invalid', ()=> {
    cy.get('input[type=email]').clear();
    cy.get('button').should('be.disabled')

    cy.get('input[type=email]').type('show_courses');
    cy.get('button').should('be.disabled')

    cy.get('input[type=email]').type('show_courses@xxx');
    cy.get('input[type=password]').clear()
    cy.get('button').should('be.disabled')
  })

  it('should show loading spinner during login', ()=> {
    cy.get('input[type=checkbox]').uncheck({force: true});

    cy.get('form').submit().then(() => {
      cy.get('.loading-container').should('be.visible')
    })

    cy.url().should('include', '/courses').then(() => {
      cy.get('.loading-container').should('not.be.visible')
    })
  })

  it('should store login data in local storage after login', ()=> {
    cy.get('input[type=checkbox]').uncheck({force: true});
    cy.get('form').submit()

    cy.url().should('include', '/courses').then(() => {
      expect(localStorage.getItem('auth_user')).to.exist

      const authUser = JSON.parse(localStorage.getItem('auth_user'));
      expect(authUser).to.deep.equal(
        {
          "email": "show_courses@test.com",
          "userType": 0,
          "photoUrl": null
        }
      )
    })
  })

  it('should clear local storage after logout', ()=> {
    cy.get('input[type=checkbox]').uncheck({force: true});
    cy.get('form').submit()

    cy.url().should('include', '/courses')

    cy.get('.navigation-items').contains('Logout').click()

    cy.url().should('include', '/welcome')
      .then(() => {
      expect(localStorage.getItem('auth_user')).to.not.exist
    })
  })

});
