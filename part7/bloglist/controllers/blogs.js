const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog(request.body)
  blog.user = user._id

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id)
    return response.status(401).json({ error: 'token missing or invalid' })

  const body = request.body
  const user = await User.findById(decodedToken.id)
  blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (blog.user.toString() === decodedToken.id) {
      const user = await User.findById(decodedToken.id)
      user.blogs = user.blogs.filter(blogId => blogId !== blog._id)
      await user.save()
      await Blog.findByIdAndRemove(request.params.id)
      return response.status(204).end()
    } else {
      return response.status(401).json({ error: 'Unauthorized' })
    }
  }

  return response.status(400).json({ error: 'can not find the blog' })
})

// api/blogs/:id/comments
blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.comments)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    blog.comments = blog.comments.concat(body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.comments)
  } else {
    response.status(400).json({ error: 'can not find the blog' })
  }
  
})

module.exports = blogsRouter