import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [theMessage, setTheMessage] = useState(null)
  const [messageType, setMessageType] = useState('info')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTheMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setMessageType('info')
        setTimeout(() => {
          setTheMessage(null)
        }, 5000)
      })
      .catch(error => {
        setTheMessage('addBlog failed')
        setMessageType('error')
        setTimeout(() => {
          setTheMessage(null)
        }, 5000)
      })
  }

  const updateBlog = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        let newBlogs = []
        blogs.forEach(blog => {
          if (blog.id === returnedBlog.id){
            blog.likes = returnedBlog.likes
          }
          newBlogs = newBlogs.concat(blog)
        });
        setBlogs(newBlogs)
      })
      .catch(error => {
        console.log(error)
        setTheMessage('updateBlog failed')
        setMessageType('error')
        setTimeout(() => {
          setTheMessage(null)
        }, 5000)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setTheMessage('wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setTheMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={theMessage} messageType={messageType} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password 
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={theMessage} messageType={messageType} />
      <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="new blog">
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      )}
    </div>
  )
}

export default App