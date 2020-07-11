// type definitions for Cypress object "cy"
/// <reference types="cypress" />

import { NotificationService } from '../../src/app/shared/notification.service';
import { Environment } from '../../src/environments/environment';

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

  it.only('should disable login button  if field is empty or invalid', ()=> {
    cy.get('input[type=email]').clear();
    cy.get('button').should('be.disabled')

    cy.get('input[type=email]').type('show_courses');
    cy.get('button').should('be.disabled')

    cy.get('input[type=email]').type('show_courses@xxx');
    cy.get('input[type=password]').clear()
    cy.get('button').should('be.disabled')
  })

});
