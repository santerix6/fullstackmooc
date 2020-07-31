import React from 'react'
import {createBlog} from '../reducers/blogsReduxer'
import {useDispatch} from 'react-redux'
import {setNotification} from '../reducers/notificationReducer'
import {setStyle} from '../reducers/notificationstyleReducer'
const Blogform = (props) => {
  const dispatch = useDispatch()
  const handleCreate = async(event) => {
    event.preventDefault()
    let newBlog = {
      title: event.target.Title.value,
      author: event.target.Author.value,
      url: event.target.Url.value,
    }
    try {
      // const new_blog = await props.create(newBlog)
      dispatch(createBlog(newBlog))
      props.blogFormRef.current.toggleVisibilty()
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`))
      dispatch(setStyle('good'))
      event.target.Title.value = ''
      event.target.Author.value = ''
      event.target.Url.value = ''
    } catch {
      dispatch(setNotification('failed to add new blog'))
      dispatch(setStyle('bad'))
    }
  }
  return(
    <div>
      <div className='formDiv'>
        <h2>Create new blog</h2>
        <form onSubmit={handleCreate}>
          <div>
            title<input type='text' id='title' name='Title'
              />
          </div>
          <div>
            author<input type='text' id='author'  name='Author'
              />
          </div>
          <div>
            url<input type='text' id='url'  name='Url'
              />
          </div>
          <button id='save' type='submit'>submit </button>
        </form>

      </div>

    </div>)
}


export default Blogform
