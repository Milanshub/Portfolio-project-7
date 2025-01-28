/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
    // Wait for initial animations to complete
    cy.wait(2000)
  })

  // Navigation and sections visibility
  it('should navigate to sections when clicking nav buttons', () => {
    // Check if navigation exists
    cy.get('nav').should('exist')

    // Test each navigation item
    const sections = ['about', 'projects', 'skills']
    sections.forEach((section) => {
      // Click nav item
      cy.get(`a[href="#${section}"]`).click()
      cy.wait(8000) // Wait for scroll animation
      
      // Verify section is visible
      cy.get(`#${section}`).should('be.visible')
    })
  })

  // Theme toggle
  it('should toggle between light and dark themes', () => {
    // Toggle to dark theme
    cy.get('button[aria-label="Toggle theme"]').click()
    cy.get('html').should('have.class', 'dark')
    cy.wait(500) // Wait for theme transition

    // Toggle back to light theme
    cy.get('button[aria-label="Toggle theme"]').click()
    cy.get('html').should('not.have.class', 'dark')
  })
})