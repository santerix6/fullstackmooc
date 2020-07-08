import React, {useState} from 'react'

const Blog = ( props ) => {
  const [row, setRow] = useState(false)

  const handleClick = (event) => {
    setRow(!row)
  }
  const handleLike = async(event) => {
    props.blog.likes++
    let newBlogi = {
      user: props.blog.user.id,
      likes: props.blog.likes,
      author: props.blog.author,
      title: props.blog.title,
      url: props.blog.url
    }
    console.log(newBlogi)
    try{
      const updated = await props.blogService.update(props.blog.id, newBlogi)
      console.log(updated)
      props.setErrorMessage(`succesfully updated ${props.blog.title} likes`)
      props.setMessageType('good')
      setTimeout(() => {
        props.setErrorMessage(null)
        props.setMessageType(null)
      }, 5000)
    } catch {
      props.setErrorMessage(`failed to update ${props.blog.name} likes`)
      props.setMessageType('bad')
      setTimeout(() => {
        props.setErrorMessage(null)
        props.setMessageType(null)
      }, 5000)
    }

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
      <p>{props.blog.likes} <button type='button' onClick={handleLike}>like</button></p>
      <p>{props.blog.author}</p>
      </div>
    )
  }
}

export default Blog
