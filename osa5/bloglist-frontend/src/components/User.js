import React from 'react'
import {
          useParams
        } from "react-router-dom"
import {ListGroup} from 'react-bootstrap'

const User = (props) => {
  const id = useParams().id
  const user = props.users.find(n=>n.id ===id)
  if (!user) {
    return null
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ListGroup>
        {user.blogs.map(blog =>
          <ListGroup.Item key={blog.id} variant="secondary">{blog.title}</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default User
