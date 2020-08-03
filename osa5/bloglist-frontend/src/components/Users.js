import React from 'react'
import { BrowserRouter as Router,
          Link
        } from "react-router-dom"
const Users = (props) => {
    console.log(props.users);
    return (
      <div>
        <h2>Users</h2>
        <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {props.users.map(user =>
            <tr key={user.username}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
  )




}

export default Users
