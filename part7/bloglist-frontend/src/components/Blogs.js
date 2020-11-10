import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import CommentForm from './CommentForm'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'

export const Blog = ({ blog }) => {
  const dispatch = useDispatch()

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
      <div>{blog.likes} likes <Button variant='primary' onClick={() => updateLikes()}>like</Button></div>
      <div>added by {blog.user.username}</div>
      <h3>comments</h3>
      <CommentForm id={blog.id}/>
      <Table striped>
        <tbody>
          {blog.comments.map(comment =>
            <tr key={comment}>
              <td>{comment}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <div><Button variant='danger' onClick={() => deleteOneBlog()}>remove</Button></div>
    </div>
  )
}

const Blogs = ({ blogs }) => {
  return (
    <Table striped>
      <tbody>
        {blogs.map(b =>
          <tr key={b.id}>
            <td><Link to={`/blogs/${b.id}`}>{b.title}</Link></td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default Blogs
