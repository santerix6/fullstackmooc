import React, {useState} from 'react'
import Togglable from './Togglable'


const Blog = ( props ) => {
  const [row, setRow] = useState(false)

  const handleClick = (event) => {
    setRow(!row)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 500,
  }
  if(row ===false){
    return (
      <div style={blogStyle}>
        {props.blog.title} {props.blog.author} <button type='button' onClick={handleClick}>
        view</button>
      </div>
    )
  }
  if(row ===true){
    return (
      <div style={blogStyle}>
      <p>{props.blog.title} <button type='button' onClick={handleClick}>hide</button></p>
      <p>{props.blog.url}</p>
      <p>{props.blog.likes} <button type='button'>like</button></p>
      <p>{props.blog.author}</p>
      </div>
    )
  }
}

export default Blog
