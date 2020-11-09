import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    borderRadius: 5,
    backgroundColor: '#0087F6'
  }

  const [showBlogDetail, setShowBlogDetail] = useState(false)

  const updateLikes = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      user: blog.user.id
    }
    dispatch(updateBlog(blog.id, blogObject))
  }

  const deleteOneBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  if (showBlogDetail)
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={() => setShowBlogDetail(false)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => updateLikes()}>like</button></div>
        <div>{blog.user.username}</div>
        <div><button style={removeButtonStyle} onClick={() => deleteOneBlog()}>remove</button></div>

      </div>
    )
  else
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={() => setShowBlogDetail(true)}>view</button>
      </div>
    )
}

export default Blog
