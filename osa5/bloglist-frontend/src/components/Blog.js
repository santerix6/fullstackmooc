import React from 'react'
import {useDispatch} from 'react-redux'
import {likeBlog, deleteBlog, addComment} from '../reducers/blogsReduxer'
import {setNotification} from '../reducers/notificationReducer'
import {setStyle} from '../reducers/notificationstyleReducer'
import {  useHistory, useParams
        } from "react-router-dom"
const Blog = ( props ) => {
  const id = useParams().id
  const blog = props.blogs.find(n=>n.id===id)
  const history = useHistory()
  const dispatch = useDispatch()
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

  const addCommentt = async(event) =>{
    event.preventDefault()
    const id = blog.id
    console.log('test1', event.target.Comment.value);
    try {
      dispatch(addComment(id, event.target.Comment.value))

      dispatch(setNotification(`succesfull commentting`))
      dispatch(setStyle('good'))
      event.target.Comment.value = ""
    } catch (e) {
      console.log(e);
      dispatch(setNotification(`failed to comment`))
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
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes} <button id='like' type='button' onClick={handleLike}>like</button></p>
        <p>added by {blog.author}</p>
        {blog.user.username ===props.user.username && <button id='remove' type='button' onClick={handleRemove} >remove</button>}
        <h3>comments</h3>
        <div>
          <form onSubmit={addCommentt}>
            <div>
              <input type="text" id='comment' name="Comment" /><button id='save' type='submit'>add comment </button>
            </div>
          </form>
        </div>
        <ul>
          {blog.comments.map((comment, i) =>
          <li key={i} >{comment}</li>)}
        </ul>
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
