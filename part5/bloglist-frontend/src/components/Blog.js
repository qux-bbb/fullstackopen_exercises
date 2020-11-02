import React from 'react'
import {useState} from 'react'

const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
    updateBlog(blog.id, blogObject)
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
