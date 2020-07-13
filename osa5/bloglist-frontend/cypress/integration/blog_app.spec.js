describe('Note', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name : 'Sane Notski',
      username : 'sane96',
      password : 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })
  it('default view shows login from', function() {
    cy.visit('http://localhost:3000')
    cy.contains('username')
    cy.contains('password')
  })
  describe('Testing Login', function() {
    it('succes with correct credens', function() {
      const login_credens = {
        username: 'sane96',
        password: 'salainen'
      }
      cy.get('#username').type('sane96')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains(`Sane Notski loggeed in`)
    })
    it('fails with wrong credens', function() {

      cy.get('#username').type('sane97')
      cy.get('#password').type('salainefn')
      cy.get('#login-button').click()
      cy.get('.error').should('have.css','color','rgb(255, 0, 0)')
      cy.contains('wrong username of password')
    })
  })
})
