const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('root_pass', 10)
  const user = new User({ username: 'root', passwordHash, name: 'The Root' })
  const savedUser = await user.save()

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)
  helper.authorizationValue = `bearer ${token}`

  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    blog.user = savedUser._id
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
}, 30000)

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

describe('viewing a specific blog', () => {

  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    blogToView.user = blogToView.user.toString()
    expect(resultBlog.body).toEqual(blogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = '233333333333333333333333'

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'How do I pass command line arguments to a Node.js program?',
      author: 'milkplus',
      url: 'https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-a-node-js-program',
      likes: 2506
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', helper.authorizationValue)
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
  
  test('failed to add blog because token does not exist', async () => {
    const newBlog = {
      title: 'How do I pass command line arguments to a Node.js program?',
      author: 'milkplus',
      url: 'https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-a-node-js-program',
      likes: 2506
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('missing like attribute, default value set to 0', async () => {
    const newBlog = {
      title: 'How do I pass command line arguments to a Node.js program?',
      author: 'milkplus',
      url: 'https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-a-node-js-program',
    }
  
    const response = await api
      .post('/api/blogs')
      .set('Authorization', helper.authorizationValue)
      .send(newBlog)
    expect(response.body.likes).toBe(0)
  })
  
  test('blog without title and url will return 400', async () => {
    const newBlog = {
      author: 'milkplus'
    }
  
    const respose = await api
      .post('/api/blogs')
      .set('Authorization', helper.authorizationValue)
      .send(newBlog)
      .expect(400)
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
      .set('Authorization', helper.authorizationValue)
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
      likes: blogsAtStart[1].likes+1,
      user: blogsAtStart[1].user
    }

    const respose = await api.put(`/api/blogs/${blogsAtStart[1].id}`).send(blogToUpdate)
    expect(respose.status).toBe(200)
    expect(respose.body.likes).toBe(blogsAtStart[1].likes+1)
  })
})

describe('when there is initially one user in db', () => {
  test('get all user', async () => {
    const response = await api.get('/api/users')
    const users = response.body
    expect(users[0].username).toBe('root')
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jackey',
      password: 'ig_tes',
      name: 'jackeylove',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if no username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      password: 'test_pass',
      name: 'Superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password length less than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jackey',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toEqual('the password is required and must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})