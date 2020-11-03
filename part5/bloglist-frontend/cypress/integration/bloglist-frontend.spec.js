describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    console.log(cy)
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
  
      cy.contains('mluukkai logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
  
      cy.get('.error').contains('wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('title1')
      cy.get('#author').type('author1')
      cy.get('#url').type('url1')
      cy.get('button').contains('create').click()
      cy.contains('title1 author1')
    })

    describe('When a blog is created', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'title1', url: 'url1', author: 'author1', likes: 1 })
      })

      it('The likes button can be clicked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 2')
      })

      it('The user who created the blog can delete it', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'title1 author1')
      })

      it('The user can not delete a blog he created', function() {
        const user = {
          name: 'test_name',
          username: 'test_username',
          password: 'test_password'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)

        cy.login({ username: 'test_username', password: 'test_password' })

        cy.contains('view').click()
        cy.contains('remove').click()

        cy.contains('deleteBlog failed')
        cy.contains('title1 author1')
      })
    })
  })
})