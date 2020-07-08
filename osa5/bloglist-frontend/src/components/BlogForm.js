import React, { useState } from 'react'
const Blogform = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAuthor = (event) => {
    console.log(event.target.value)
    setAuthor(event.target.value)
  }
  const handleTitle = (event) => {
    console.log(event.target.value)
    setTitle(event.target.value)
  }
  const handleUrl = (event) => {
    console.log(event.target.value)
    setUrl(event.target.value)
  }
  const handleCreate = async(event) => {
    event.preventDefault()
    let newBlog = {
      title: title,
      author: author,
      url: url,
    }
    try {
      const new_blog = await props.blogService.create(newBlog)
      console.log(new_blog)
      props.blogFormRef.current.toggleVisibilty()
      setTitle('')
      setAuthor('')
      setUrl('')
      props.setErrorMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      props.setMessageType('good')
      setTimeout(() => {
        props.setErrorMessage(null)
        props.setMessageType(null)
      }, 5000)

    } catch {
      props.setErrorMessage('failed to add new blog')
      props.setMessageType('bad')
      setTimeout(() => {
        props.setErrorMessage(null)
        props.setMessageType(null)
      }, 5000)
    }try {
      const blogs = await props.blogService.getAll()
      console.log(blogs)
      props.setBlogs(blogs)
    } catch {
      props.setErrorMessage('couldnt get all blogs')
      props.setMessageType('bad')
      setTimeout(() => {
        props.setErrorMessage(null)
        props.setMessageType(null)
      }, 5000)
    }
  }
  return(
    <div>
      <div>
        <h2>Create new blog</h2>
        <form onSubmit={handleCreate}>
          <div>
            title<input type='text' value={title} name='Title'
              onChange={handleTitle}/>
          </div>
          <div>
            author<input type='text' value={author} name='Author'
              onChange={handleAuthor}/>
          </div>
          <div>
            url<input type='text' value={url} name='Url'
              onChange={handleUrl}/>
          </div>
          <button type='submit'>submit </button>
        </form>

      </div>

    </div>)
}


export default Blogform
