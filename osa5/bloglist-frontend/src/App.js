import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Blogform from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import {useSelector, useDispatch} from 'react-redux'
import {getBlogs} from './reducers/blogsReduxer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state=>state)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [messagetype, setMessageType] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])
  console.log('asdasdsad',blogs);
  useEffect(() => {
    const loggedBlogUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedBlogUserJSON){
      const user = JSON.parse(loggedBlogUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const sortBlogs = () => {
    blogs.sort((a,b) => b.likes-a.likes)

  }
  const handleClick = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    setErrorMessage('succesfull logout')
    setMessageType('good')
    setTimeout(() => {
      setErrorMessage(null)
      setMessageType(null)
    }, 5000)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging as ', username, password)
    try {
      const user = await loginService.login({ username, password })
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

  const handleUsername = (event) => {
    console.log(event.target.value)
    setUsername(event.target.value)
  }

  const loginForm = () => (

    <form onSubmit={handleLogin}>
      <div>
        username <input type='text' value={username} name='Username' id='username'
          onChange={handleUsername}/>
      </div>
      <div>
        password <input type='password' value={password} name='Password' id='password'
          onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button id='login-button' type='submit'>login </button>
    </form>
  )
  const blogsForm = () => {
    //sortBlogs()
    return (
      <div>
        <div>
          {user.name} loggeed in
          <button type='button'
            onClick={handleClick}>
          Logout</button>
        </div>
        <Togglable nimi='add new blog' ref={blogFormRef}>
          <Blogform
            setErrorMessage={setErrorMessage}
            setMessageType={setMessageType}
            create={blogService.create}
            getAll={blogService.getAll}

            blogFormRef={blogFormRef}
          />
        </Togglable>

        <div className='blogs'>
          <h2>blogs</h2>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}
              blogFormRef={blogFormRef}
              blogService={blogService}
              setErrorMessage={setErrorMessage}
              setMessageType={setMessageType}
              user={user}
               />
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
