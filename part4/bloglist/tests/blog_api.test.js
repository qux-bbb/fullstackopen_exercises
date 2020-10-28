const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('there are six blogs', async () => {
  const blogsAtStart = await helper.blogsInDb()

  expect(blogsAtStart).toHaveLength(6)
})

test('the unique identifier property is named id', async () => {
  const blogsAtStart = await helper.blogsInDb()

  expect(blogsAtStart[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})