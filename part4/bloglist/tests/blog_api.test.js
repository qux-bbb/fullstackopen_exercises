const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('there is one blog', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(1)
})

test('the unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})