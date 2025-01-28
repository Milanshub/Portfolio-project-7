/// <reference types="cypress" />

// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
// ***********************************************************

import '@testing-library/cypress/add-commands'

// Add custom commands
Cypress.Commands.add('getByTestId', (selector: string) => {
  return cy.get(`[data-testid="${selector}"]`)
})

// Alternatively you can use CommonJS syntax:
// require('./commands')

declare global {
  namespace Cypress {
  interface Chainable {
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>
  }
}
}

// Declare test globals
declare global {
  const describe: typeof cy.describe
  const it: typeof cy.it
  const beforeEach: typeof cy.beforeEach
} 