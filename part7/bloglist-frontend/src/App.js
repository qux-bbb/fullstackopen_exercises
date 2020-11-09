import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import Blogs, { Blog } from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users, { User } from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { currentUserChange } from './reducers/currentUserReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  },[dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(currentUserChange(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const currentUser = useSelector(state => state.currentUser)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  const match = useRouteMatch('/users/:id')
  const user = match 
  ? users.find(user => user.id === match.params.id)
  : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch 
  ? blogs.find(blog => blog.id === blogMatch.params.id)
  : null

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch(currentUserChange(user))
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
    dispatch(currentUserChange(null))
  }

  if (currentUser === null) {
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

  const padding = {
    padding: 5
  }

  const greyBg = {
    background: 'lightgrey',
    padding: 5
  }

  return (
    <div>
      <div style={greyBg}>
        <Link style={padding} to='/blogs'>blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <b>{currentUser.username} logged in <button onClick={handleLogout}>logout</button></b>
      </div>
      <h2>blogs</h2>
      <Notification />
      <Switch>
        <Route path='/users/:id'>
          <User user={user} />
        </Route>
        <Route path='/users'>
          <Users users={users} />
        </Route>
        <Route path='/blogs/:id'>
          <Blog blog={blog} />
        </Route>
        <Route path='/'>  
          <Togglable buttonLabel="new blog">
            <BlogForm />
          </Togglable>
          <Blogs blogs={blogs} />
        </Route>

      </Switch>
    </div>
  )
}

export default App