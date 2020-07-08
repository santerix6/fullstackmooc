import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Blogform from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [messagetype, setMessageType] = useState(null)

  const blogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    const loggedBlogUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedBlogUserJSON){
      const user = JSON.parse(loggedBlogUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleClick = (event) => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    setErrorMessage(`succesfull logout`)
    setMessageType('good')
    setTimeout(() => {
      setErrorMessage(null)
      setMessageType(null)
    }, 5000)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging as ', username, password);
    try {
      const user = await loginService.login({username, password})
      console.log(user.token)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage(`succesfull login as ${username}`  )
      setMessageType('good')
      setTimeout(() => {
        setErrorMessage(null)
        setMessageType(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('wrong username of password')
      setMessageType('bad')
      setTimeout(() => {
        setErrorMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }
  const handleCreate = async(event) => {
    event.preventDefault()
    let newBlog = {
      title: title,
      author: author,
      url: url,
    }
    try {
      const new_blog = await blogService.create(newBlog)
      console.log(new_blog)
      blogFormRef.current.toggleVisibilty()
      setTitle('')
      setAuthor('')
      setUrl('')
      setErrorMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setMessageType('good')
      setTimeout(() => {
        setErrorMessage(null)
        setMessageType(null)
      }, 5000)
      try{
        const blogs = await blogService.getAll()
        console.log(blogs)
        setBlogs(blogs)
      } catch{
          setErrorMessage('couldnt get all blogs')
          setMessageType('bad')
          setTimeout(() => {
            setErrorMessage(null)
            setMessageType(null)
          }, 5000)
      }
    } catch {
      setErrorMessage('failed to add new blog')
      setMessageType('bad')
      setTimeout(() => {
        setErrorMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }
  const handleUsername = (event) => {
    console.log(event.target.value)
    setUsername(event.target.value)
  }
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
  const loginForm = () => (

      <form onSubmit={handleLogin}>
      <div>
        username <input type='text' value={username} name='Username'
        onChange={handleUsername}/>
      </div>
      <div>
        password <input type='password' value={password} name='Password'
        onChange={({target}) => setPassword(target.value)}/>
      </div>
      <button type='submit'>login </button>
       </form>
  )
  const blogsForm = () => {
    return (
      <div>
        <div>
          {user.name} loggeed in
          <button type='button'
          onClick={handleClick}>
          Logout</button>
        </div>
      <Togglable ref={blogFormRef}>
      <Blogform
        handleCreate={handleCreate}
        title={title}
        author={author}
        url={url}
        setTitle={handleTitle}
        setAuthor={handleAuthor}
        setUrl={handleUrl}
        />
      </Togglable>

      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}</div>
    </div>
    )
  }
  return (
    <div>
    <Notification noti={errorMessage} type={messagetype}/>

    {user === null && loginForm()}
    {user !== null &&  blogsForm()}
    </div>
  )
}

export default App