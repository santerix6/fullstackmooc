import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {likeBlog, deleteBlog} from '../reducers/blogsReduxer'
import {setNotification} from '../reducers/notificationReducer'
import {setStyle} from '../reducers/notificationstyleReducer'
import { BrowserRouter as Router,
          Switch, Route,Link, Redirect, useHistory, useParams
        } from "react-router-dom"
const Blog = ( props ) => {
  const id = useParams().id
  const blog = props.blogs.find(n=>n.id===id)
  const history = useHistory()
  const dispatch = useDispatch()
  const [row, setRow] = useState(false)
  const handleClick = () => {
    setRow(!row)
  }
  if (!blog) {
    return null
  }
  const handleLike = async() => {
    blog.likes++
    let newBlogi = {
      user: blog.user.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    console.log(newBlogi)
    try{
      dispatch(likeBlog(blog.id, newBlogi))
      dispatch(setNotification(`succesfully updated ${newBlogi.title} likes`))
      dispatch(setStyle('good'))
    }
    catch {
      dispatch(setNotification(`failed to updated ${newBlogi.title} likes`))
      dispatch(setStyle('bad'))

    }
  }
  const handleRemove = async() => {
    console.log(blog.id)
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification(`succesfully deleted ${blog.title} `))
        dispatch(setStyle('good'))
        history.push('/')
      } catch(e){
        console.log(e);
        dispatch(setNotification(`failed to delete ${blog.name} `))
        dispatch(setStyle('bad'))
      }
    }
  }

  return (
      <div  className='blog'>
        <h1>{blog.title}</h1>
        <a href='#'>{blog.url}</a>
        <p>{blog.likes} <button id='like' type='button' onClick={handleLike}>like</button></p>
        <p>added by {blog.author}</p>
        {blog.user.username ===props.user.username && <button id='remove' type='button' onClick={handleRemove} >remove</button>}
      </div>
    )

  // if(row ===true){
  //   //console.log(props.blog.user.username, props.user.username)
  //   return (
  //     <div className='blog' style={blogStyle}>
  //       <p>{props.blog.title} <button type='button' onClick={handleClick}>hide</button></p>
  //       <p>{props.blog.url}</p>
  //       <p id='likes'>{props.blog.likes} <button id='like' type='button' onClick={handleLike}>like</button></p>
  //       <p>{props.blog.author}</p>
  //       {props.blog.user.username ===props.user.username && <button id='remove' type='button' onClick={handleRemove} >remove</button>}
  //     </div>
  //   )
  // }
}

export default Blog
