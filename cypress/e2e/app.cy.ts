describe('Basic App Test', () => {
  it('should visit the homepage', () => {
    cy.visit('/')
    cy.contains('h1', 'Hello').should('exist')
  })
})
