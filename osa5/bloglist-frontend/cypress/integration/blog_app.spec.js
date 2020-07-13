describe('Note', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  it('default view shows login from', function() {
    cy.visit('http://localhost:3000')
    cy.contains('username')
    cy.contains('password')
  })
})
