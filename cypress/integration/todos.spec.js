// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Todos Page', () => {
  beforeEach(() => {
    cy.visit('/todos');

    cy.contains('Todos für dieses Projekt');
  });

  it('should display a list of todos', () => {
    cy.get('tbody tr').should('have.length.greaterThan', 4);
  });

  it('should display searched items', () => {
    cy.get('.filter .mat-input-element').type('todos');

    cy.get('.mat-table').should('contain', 'Todos sortieren');

    cy.get('.mat-table').find('tr').should('have.length.gte', 5);

    cy.get('.mat-table').contains('td', 'erledigt').should('be.visible');
  });

  it('should use paging', () => {
    cy.get('.filter .mat-input-element').type('erledigt');

    cy.get('.mat-paginator-page-size-select').as('pageSize');

    cy.get('@pageSize').should('contain', 10);

    cy.get('@pageSize')
      .then((selects) => {
        let select = selects[0];
        console.log('select', select);
        cy.wrap(select).click().get('mat-option').contains(5);
      })
      .click({ force: true });
    cy.get('.mat-table').find('tr').should('have.length', 6);
    cy.get('.mat-table').contains('td', '5').should('be.visible');

    cy.get('@pageSize')
      .then((selects) => {
        let select = selects[0];
        cy.wrap(select).click().get('mat-option').contains(20);
      })
      .click({ force: true });
    cy.get('.mat-table').find('tr').should('have.length', 21);
    cy.get('.mat-table').contains('td', '20').should('be.visible');

    // cy.get('@pageSize').type(10).click({ force: true });
    // cy.get('.mat-table').find('tr').should('have.length', 11);
  });

  it('should hide Id and Type for mobile devices', () => {
    cy.viewport('macbook-11');
    cy.get('.mat-table').contains('th', 'Nr').should('be.visible');
    cy.get('.mat-table').contains('th', 'Typ').should('be.visible');

    cy.viewport('ipad-2');
    cy.get('.mat-table').contains('th', 'Nr').should('be.visible');
    cy.get('.mat-table').contains('th', 'Typ').should('be.visible');

    cy.viewport('iphone-6');
    cy.get('.mat-table').contains('th', 'Nr').should('be.hidden');
    cy.get('.mat-table').contains('th', 'Typ').should('be.hidden');

    cy.viewport('samsung-s10');
    cy.get('.mat-table').contains('th', 'Nr').should('be.hidden');
    cy.get('.mat-table').contains('th', 'Typ').should('be.hidden');
  });
});
