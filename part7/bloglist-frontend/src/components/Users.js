import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

export const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.username}</h2>
      <div><b>added blogs</b></div>
      <Table striped>
        <tbody>
          {user.blogs.map(blog =>
            <tr key={blog.id}>
              <td>{blog.title}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const Users = ({ users }) => {
  return (
    <Table striped>
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
    </Table>
  )
}

export default Users