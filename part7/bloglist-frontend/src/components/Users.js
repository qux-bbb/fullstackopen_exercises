import React from 'react'
import { useSelector } from 'react-redux'

const User = ({ user }) => {
  console.log(user.blogs)
  console.log(user.blogs.length)

  return (
    <tr>
      <td>{user.username}</td><td>{user.blogs.length}</td>
    </tr>
  )
}

const Users = () => {
  const users = useSelector(state => state.users)
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <User key={user.id} user={user}/>)}
        </tbody>
      </table>
    </div>
  )
}

export default Users