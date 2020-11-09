import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'

export const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const removeButtonStyle = {
    borderRadius: 5,
    backgroundColor: '#0087F6'
  }

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

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={() => updateLikes()}>like</button></div>
      <div>added by {blog.user.username}</div>
      <h3>comments</h3>
      <ul>
        {blog.comments.map(comment => 
          <li key={comment}>{comment}</li>
        )}
      </ul>
      <div><button style={removeButtonStyle} onClick={() => deleteOneBlog()}>remove</button></div>
    </div>
  )
}

const Blogs = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div>
      {blogs.map(b =>
        <div key={b.id} style={blogStyle}><Link to={`/blogs/${b.id}`}>{b.title}</Link></div>
      )}
    </div>
  )
}

export default Blogs
