import React from 'react'
import { BrowserRouter as Router,
          useParams
        } from "react-router-dom"

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
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User
