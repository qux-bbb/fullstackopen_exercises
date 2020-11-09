import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    dispatch(createBlog(blogObject))
    dispatch(
      setNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
        'info'
      )
    )
    setTimeout(() => {
      dispatch(setNotification(null, 'info'))
    }, 5000)

    // setNewTitle('')
    // setNewAuthor('')
    // setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input id='title' value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
          author: <input id='author' value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          url: <input id='url' value={newUrl} onChange={handleUrlChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm