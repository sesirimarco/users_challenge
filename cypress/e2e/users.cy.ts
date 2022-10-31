/// <reference types="cypress" />
describe('User Apps', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.intercept({ pathname: '/api', method: 'GET' }).as('users');
  });

  it('front page can be opened', () => {
    cy.get('[data-cy="users-container"]');
  });

  it('make a search by email', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait('@users').then((interception) => {
      const email = interception.response?.body.results[0].email;
      cy.get('[data-cy="filter-search"]').type(email);
      cy.get('[data-cy="card-user"]').should('have.length', 1);
      cy.get('[data-cy="card-user"]').contains(email);
    });
  });

  it('edit a user name and search', () => {
    const newName = 'Ana Maria';
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait('@users');
    cy.get('[data-cy="card-user"]:first-child [data-cy="user-name"]').click();
    cy.get('[data-cy="user-name-editable"]').clear();
    cy.get('[data-cy="user-name-editable"]').type(newName);
    cy.get('[data-cy="user-name-editable"]').blur();
    cy.get('[data-cy="filter-search"]').type(newName);
    cy.get('[data-cy="card-user"]').should('have.length', 1);
    cy.get('[data-cy="card-user"]').contains(newName);
  });
});

//  debe renderizarse la web
// debe hacer una busqueda por email y que aparezca el usuario
// debe editar el mail (selecciona el primer usuari, hace click en mail)
// debe ordenar: al seleccionar un criterio el usuario editado debe aparecer primero
// al buscar un usuario que no existe debe mostrar el arlert de 'There is not content'
