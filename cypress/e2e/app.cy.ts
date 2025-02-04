describe('Portfolio Website E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    // Wait for initial animations to complete
    cy.wait(1000)
  })

  describe('Hero Section', () => {
    it('should display the hero section with correct content', () => {
      cy.get('section#home').should('be.visible')
      cy.contains('h1', "Hello, I'm Milan").should('be.visible')
      cy.contains('p', 'A passionate developer crafting beautiful and functional web experiences').should('be.visible')
      cy.get('button').contains('Resume').should('be.visible')
    })
  })

  describe('Navigation', () => {
    it('should have working navigation links', () => {
      // Check if all nav items exist
      cy.get('nav').within(() => {
        ['Home', 'About', 'Skills', 'Projects'].forEach(section => {
          cy.contains(section).should('be.visible')
        })
      })

      // Test navigation to each section with better waiting strategy
      cy.contains('About').click()
      cy.get('#about', { timeout: 10000 })
        .should('exist')
        .and('be.visible')
        .and('have.css', 'opacity', '1')
      
      cy.contains('Skills').click()
      cy.get('#skills', { timeout: 10000 })
        .should('exist')
        .and('be.visible')
        .and('have.css', 'opacity', '1')
      
      cy.contains('Projects').click()
      cy.get('#projects', { timeout: 10000 })
        .should('exist')
        .and('be.visible')
        .and('have.css', 'opacity', '1')
      
      cy.contains('Home').click()
      cy.window().its('scrollY').should('equal', 0)
    })

    it('should have working theme toggle', () => {
      cy.get('button[aria-label="Toggle theme"]').click()
      cy.get('html').should('have.class', 'dark')
      cy.get('button[aria-label="Toggle theme"]').click()
      cy.get('html').should('not.have.class', 'dark')
    })
  })

  describe('About Section', () => {
    beforeEach(() => {
      cy.get('#about').scrollIntoView()
      cy.wait(1000) // Wait for animations to complete
    })

    it('should display about section content', () => {
      cy.get('#about').within(() => {
        cy.contains('h2', 'About Me').should('be.visible')
        cy.contains('Technical Evolution').should('exist')
        cy.contains('Core Competencies').should('exist')
        cy.contains('Systems Thinking').should('exist')
      })
    })

    it('should have profile image', () => {
      cy.get('#about img[alt="Profile"]').should('exist')
    })
  })

  describe('Skills Section', () => {
    beforeEach(() => {
      cy.get('#skills').scrollIntoView()
      cy.wait(1000)
    })

    it('should display skills with progress bars', () => {
      cy.get('#skills').within(() => {
        cy.contains('h2', 'Skills & Expertise').should('be.visible')
        
        // Check for specific skills
        const expectedSkills = ['React', 'TypeScript', 'Node.js', 'Docker', 'Tailwind CSS', 'Supabase']
        expectedSkills.forEach(skill => {
          cy.contains(skill).should('exist')
          cy.get('.h-2').should('exist') // Progress bar
        })
      })
    })
  })

  describe('Projects Section', () => {
    beforeEach(() => {
      cy.get('#projects').scrollIntoView()
      cy.wait(1000)
    })

    it('should display projects section', () => {
      cy.get('#projects').within(() => {
        cy.contains('h2', 'Featured Projects').should('be.visible')
        // Check for carousel using role
        cy.get('[role="region"][aria-roledescription="carousel"]').should('exist')
      })
    })

    it('should have project cards', () => {
      cy.get('#projects').within(() => {
        // Look for project cards using Card component structure
        cy.get('.rounded-xl.border.bg-card').first().within(() => {
          cy.get('img').should('exist')
          cy.get('.text-2xl.font-bold').should('exist') // Card title
          cy.get('.text-sm.text-muted-foreground').should('exist') // Card description
        })
      })
    })
  })

  describe('Footer Section', () => {
    beforeEach(() => {
      cy.get('footer').scrollIntoView()
      cy.wait(1000)
    })

    it('should display social links', () => {
      cy.get('footer').within(() => {
        // Check for social links
        cy.get('a[aria-label="GitHub"]').should('have.attr', 'href').and('include', 'github.com')
        cy.get('a[aria-label="LinkedIn"]').should('have.attr', 'href').and('include', 'linkedin.com')
        cy.get('a[aria-label="X"]').should('have.attr', 'href').and('include', 'x.com')
        cy.get('a[aria-label="Email"]').should('have.attr', 'href').and('include', 'mailto:')
      })
    })

    it('should display copyright information', () => {
      cy.get('footer').within(() => {
        cy.contains(new Date().getFullYear().toString()).should('exist')
        cy.contains('Milan').should('exist')
        cy.contains('All rights reserved').should('exist')
      })
    })
  })
})
