// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('ourses Page', () => {
  beforeEach(() => {
    Cypress.config({
      defaultCommandTimeout: 20000,
    });

    cy.loginAsUser();
  });

  it('should show loading spinner during page loading', () => {
    expect(localStorage.getItem('auth_user')).to.exist;
    cy.visit('/courses');

    cy.get('.loading-container').should('be.visible');
  });

  it('should display course header', () => {
    expect(localStorage.getItem('auth_user')).to.exist;
    cy.visit('/courses');
    cy.url().should('include', '/courses');
    cy.get('.course-header').within(() => {
      cy.contains('Liste der abgeschlossenen Kurse');
      cy.get('button').should('contain', 'aufklappen');
      cy.get('button').should('contain', 'zuklappen');
    });
  });

  it('should display course list', () => {
    cy.get('.mat-expansion-panel').should('be.visible');

    cy.get('.mat-expansion-panel-header').within(() => {
      cy.contains('Kurs');
      cy.contains('Kurs-Beschreibung');
      cy.contains('Kurs-Bestätigung');
    });

    cy.get('.mat-expansion-panel').within(() => {
      cy.get('.mat-expansion-panel-header-title').should(
        'have.length.greaterThan',
        2
      );
    });
  });

  it('should expand and collapse course list', () => {
    cy.get('button')
      .contains('alle aufklappen')
      .click()
      .then(() => {
        cy.get('.course-card').should('be.visible');
      });

    cy.get('button')
      .contains('alle zuklappen')
      .click()
      .then(() => {
        cy.get('.course-card').should('not.be.visible');
      });
  });

  it('should show course certificaton', () => {
    cy.get('.mat-expansion-panel').should('be.visible');
    cy.get('.mat-expansion-panel').within(() => {
      cy.get('.mat-expansion-panel-header-title')
        .contains('Angular (FullApp) with Angular Material, Angularfire & NgRx')
        .as('testCourse');

      cy.get('@testCourse')
        .click()
        .then(() => {
          cy.get('.certificate').should('be.visible');
        });
    });
  });

  it('should logout', () => {
    cy.logout();
  });
});
