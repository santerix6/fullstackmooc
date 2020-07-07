import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging as ', username, password);
    try {
      const user = await loginService.login({username, password})
      console.log(user.token)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log(user)
  }
  const handleUsername = (event) => {
    console.log(event.target.value)
    setUsername(event.target.value)
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
  const blogsForm = () => (
    <div>
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    </div>
  )
  return (
    <div>
    <p>{errorMessage}</p>
    {user === null && loginForm()}
    {user !== null && <div><p>Logged in as {user.name}</p>{blogsForm()}</div>}
    </div>
  )
}

export default App
