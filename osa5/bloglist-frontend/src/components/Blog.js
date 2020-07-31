import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {likeBlog, deleteBlog} from '../reducers/blogsReduxer'
import {setNotification} from '../reducers/notificationReducer'
import {setStyle} from '../reducers/notificationstyleReducer'
const Blog = ( props ) => {
  const dispatch = useDispatch()
  const [row, setRow] = useState(false)
  const handleClick = () => {
    setRow(!row)
  }
  const handleLike = async() => {
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
      dispatch(likeBlog(props.blog.id, newBlogi))
      dispatch(setNotification(`succesfully updated ${newBlogi.title} likes`))
      dispatch(setStyle('good'))
    }
    catch {
      dispatch(setNotification(`failed to updated ${newBlogi.title} likes`))
      dispatch(setStyle('bad'))

    }
  }
  const handleRemove = async() => {
    console.log(props.blog.id)
    if(window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author}`)){
      try {
        dispatch(deleteBlog(props.blog.id))
        dispatch(setNotification(`succesfully deleted ${props.blog.title} `))
        dispatch(setStyle('good'))
      } catch{
        dispatch(setNotification(`failed to delete ${props.blog.name} `))
        dispatch(setStyle('bad'))
      }
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
      <div style={blogStyle} className='blog'>
        {props.blog.title} {props.blog.author} <button type='button' onClick={handleClick} className='butt'>
        view</button>
      </div>
    )
  }
  if(row ===true){
    //console.log(props.blog.user.username, props.user.username)
    return (
      <div className='blog' style={blogStyle}>
        <p>{props.blog.title} <button type='button' onClick={handleClick}>hide</button></p>
        <p>{props.blog.url}</p>
        <p id='likes'>{props.blog.likes} <button id='like' type='button' onClick={handleLike}>like</button></p>
        <p>{props.blog.author}</p>
        {props.blog.user.username ===props.user.username && <button id='remove' type='button' onClick={handleRemove} >remove</button>}
      </div>
    )
  }
}

export default Blog
