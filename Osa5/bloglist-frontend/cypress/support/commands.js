const port = '3003'

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  likes ? likes : likes = 0
  cy.request({
    url: `http://localhost:${port}/api/blogs`,
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `http://localhost:${port}/api/login`, { username, password })
    .then(({ body }) => {
      localStorage.setItem('loggedBloglistUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
})