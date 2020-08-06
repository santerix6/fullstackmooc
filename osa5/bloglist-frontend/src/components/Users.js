import React from 'react'
import {Table} from 'react-bootstrap'
import {
          Link
        } from "react-router-dom"
const Users = (props) => {
    console.log(props.users);
    return (
      <div>
        <h2>Users</h2>
        <Table striped>
          <thead>
            <th>Users</th>
            <th>blogs created</th>
          </thead>
        <tbody>

          {props.users.map(user =>
            <tr key={user.username}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
          </tbody>
        </Table>
      </div>
  )




}

export default Users
