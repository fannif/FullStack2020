const port = '3003'

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `http://localhost:${port}/api/testing/reset`)
    const user = {
      name: 'Sulo Onni',
      username: 'testaaja',
      password: 'salis'
    }
    cy.request('POST', `http://localhost:${port}/api/users/`, user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown on front page', function() {
    cy.contains('Log in to the application')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testaaja')
      cy.get('#password').type('salis')
      cy.get('#login').click()
      cy.contains('Sulo Onni logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('salis')
      cy.get('#login').click()

      cy.contains('Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.contains('Log in to the application')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testaaja', password: 'salis' })
    })

    it('A blog can be created', function() {
      cy.get('#new-blog').click()
      cy.get('#title').type('TestiTitle')
      cy.get('#author').type('Ilona Author')
      cy.get('#url').type('url.testi.tapaus')
      cy.get('#create').click()

      cy.contains('A new blog TestiTitle by Ilona Author added')
      cy.get('#blog').contains('TestiTitle').contains('Ilona Author').contains('View')
    })

    describe('and a blog exists', function() {
      beforeEach(function () {
        cy.createBlog({ title: 'TestiTitle', author: 'Ilona Author', url:'url.testi.tapaus' })
      })

      it('a blog can be liked', function() {
        cy.contains('TestiTitle').parent()
          .find('#toggle-view').click()

        cy.contains('TestiTitle').parent()
          .should('contain', 'Likes: 0')

        cy.contains('TestiTitle').parent()
          .find('#like').click()

        cy.contains('Added a like to blog TestiTitle')

        cy.contains('TestiTitle').parent()
          .should('contain', 'Likes: 1')
      })

      it('a blog can be deleted by its creator', function() {
        cy.contains('TestiTitle').parent()
          .find('#toggle-view').click()

        cy.contains('TestiTitle').parent()
          .find('#delete').click()

        cy.contains('Deleted TestiTitle')

        cy.should('not.contain', 'TestiTitle')
      })

      it('a blog cannot be deleted if user is not its creator', function() {
        const user = {
          name: 'Sulo Armas',
          username: 'testaaja2',
          password: 'salis'
        }
        cy.request('POST', `http://localhost:${port}/api/users/`, user)
        cy.visit('http://localhost:3000')

        cy.login({ username: 'testaaja2', password: 'salis' })

        cy.contains('TestiTitle').parent()
          .find('#toggle-view').click()

        cy.contains('TestiTitle').parent()
          .should('not.contain', '#delete')
      })
    })

    describe('and multible blogs exist', function() {
      beforeEach(function () {
        cy.createBlog({ title: 'Eka', author: 'Eka Author', url:'eka.url', likes: 2 })
        cy.createBlog({ title: 'Toka', author: 'Toka Author', url:'toka.url', likes: 5 })
        cy.createBlog({ title: 'Kolmas', author: 'Kolmas Author', url:'kolmas.url', likes: 4 })
      })

      it.only('they are sorted by likes in descending order', function() {
        cy.get('.blog')
          .then(blogs => {
            cy.log(blogs)
            cy.wrap(blogs[0]).should('contain', 'Toka')
            cy.wrap(blogs[1]).should('contain', 'Kolmas')
            cy.wrap(blogs[2]).should('contain', 'Eka')
          })
      })
    })
  })

})