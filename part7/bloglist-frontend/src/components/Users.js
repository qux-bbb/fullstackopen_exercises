import React from 'react'
import { Link } from 'react-router-dom'

export const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.username}</h2>
      <div><b>added blogs</b></div>
      <ul>
        {user.blogs.map(blog => 
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

const Users = ({ users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.username}</Link></td><td>{user.blogs.length}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Users