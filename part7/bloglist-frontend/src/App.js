import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogs = useSelector(state => state.blogs)

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
        })
        // setBlogs(newBlogs)
      })
      .catch(error => {
        console.log(error)
        dispatch(setNotification('updateBlog failed', 'error'))
        setTimeout(() => {
          dispatch(setNotification(null, 'info'))
        }, 5000)
      })
  }

  const deleteBlog = theBlog => {
    if (window.confirm(`Remove blog ${theBlog.title} by ${theBlog.author}?`)) {
      blogService
        .deleteOne(theBlog.id)
        .then(result => {
          console.log(result)
          // setBlogs(blogs.filter(blog => blog.id!==theBlog.id))
        })
        .catch(error => {
          console.log(error)
          dispatch(setNotification('deleteBlog failed', 'error'))
          setTimeout(() => {
            dispatch(setNotification(null, 'info'))
          }, 5000)
        })
    }
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
      dispatch(setNotification('wrong username or password', 'error'))
      setTimeout(() => {
        dispatch(setNotification(null, 'info'))
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
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type="submit">login</button>
        </form>
      </div>
    )
  }

  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App