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
  describe('When logged in ', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'sane96', password: 'salainen'
      }).then(response => {
        localStorage.setItem('loggedBlogUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
    })
    })
    it('Blog can be created', function() {
      cy.contains('add new blog').click()
      cy.get('#title').type('testi blogi')
      cy.get('#author').type('testi author')
      cy.get('#url').type('testi url')
      cy.get('#save').click()
      cy.get('.blogs').should('contain', 'testi blogi')
    })
    it('Blog can be liked', function() {
      cy.contains('add new blog').click()
      cy.get('#title').type('testi blogi1')
      cy.get('#author').type('testi author1')
      cy.get('#url').type('testi url1')
      cy.get('#save').click()
      cy.contains('view').click()
      cy.get('#like').click()
      cy.get('#likes').contains('1')
    })
    it('Blog can be deleted by the adder', function() {
      cy.contains('add new blog').click()
      cy.get('#title').type('testi blogi1')
      cy.get('#author').type('testi author1')
      cy.get('#url').type('testi url1')
      cy.get('#save').click()
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('.blogs').should('not.contain','testi blogi1' )
    })
    it('Blog cant be deleted by others', function() {
      cy.contains('add new blog').click()
      cy.get('#title').type('testi blogi1')
      cy.get('#author').type('testi author1')
      cy.get('#url').type('testi url1')
      cy.get('#save').click()
      cy.contains('Logout').click()
      const new_user = {
        name : 'Pete Notski',
        username : 'pete98',
        password : 'salainen'
      }
      cy.request('POST', 'http://localhost:3001/api/users', new_user)
      cy.visit('http://localhost:3000')
      cy.get('#username').type('pete98')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('view').click()
      cy.get('.blogs').should('not.contain', 'remove')
    })
    it.only('Blogs are sorted by likes', function() {
      cy.contains('add new blog').click()
      cy.get('#title').type('testi blogi1')
      cy.get('#author').type('testi author1')
      cy.get('#url').type('testi url1')
      cy.get('#save').click()
      cy.contains('add new blog').click()
      cy.get('#title').type('testi blogi2')
      cy.get('#author').type('testi author2')
      cy.get('#url').type('testi url2')
      cy.get('#save').click()
      cy.contains('add new blog').click()
      cy.get('#title').type('testi blogi3')
      cy.get('#author').type('testi author3')
      cy.get('#url').type('testi url3')
      cy.get('#save').click()
      cy.contains('testi blogi2 testi author2').find('.butt').click()
      cy.wait(1000)
      cy.contains('like').click()
      cy.wait(1000)
      cy.contains('like').click()
      cy.wait(1000)
      cy.contains('like').click()
      cy.wait(1000)
      cy.contains('hide').click()
      cy.contains('testi blogi3 testi author3').find('.butt').click()
      cy.wait(1000)
      cy.contains('like').click()
      cy.get('.blog').eq(0).should('contain','testi blogi2' )
      cy.get('.blog').eq(1).should('contain','testi blogi3' )
      cy.get('.blog:last').should('contain','testi blogi1' )
    })
  })
})
