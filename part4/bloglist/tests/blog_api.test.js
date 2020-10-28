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

describe('when there is initially some blogs saved', () => {
  test('there are six blogs', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    expect(blogsAtStart).toHaveLength(6)
  })
  
  test('the unique identifier property is named id', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    expect(blogsAtStart[0].id).toBeDefined()
  })
})

describe('addition of a new note', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'How do I pass command line arguments to a Node.js program?',
      author: 'milkplus',
      url: 'https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-a-node-js-program',
      likes: 2506
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(
      'How do I pass command line arguments to a Node.js program?'
    )
  })
  
  test('missing like attribute, default value set to 0', async () => {
    const newBlog = {
      title: 'How do I pass command line arguments to a Node.js program?',
      author: 'milkplus',
      url: 'https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-a-node-js-program',
    }
  
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.body.likes).toBe(0)
  })
  
  test('blog without title and url will return 400', async () => {
    const newBlog = {
      author: 'milkplus'
    }
  
    const respose = await api.post('/api/blogs').send(newBlog)
    expect(respose.status).toBe(400)
    expect(respose.body).toEqual(
      {
        error: 'Blog validation failed: url: Path `url` is required., title: Path `title` is required.'
      })
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update a blog', () => {
  test('update a blog\'s likes number', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = {
      title: blogsAtStart[1].title,
      author: blogsAtStart[1].author,
      url: blogsAtStart[1].url,
      likes: blogsAtStart[1].likes+1
    }

    const respose = await api.put(`/api/blogs/${blogsAtStart[1].id}`).send(blogToUpdate)
    expect(respose.status).toBe(200)
    expect(respose.body.likes).toBe(blogsAtStart[1].likes+1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})