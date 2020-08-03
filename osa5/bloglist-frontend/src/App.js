import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Blogform from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import { BrowserRouter as Router,
          Switch, Route,Link, Redirect, useHistory, useParams
        } from "react-router-dom"
import blogService from './services/blogs'
import {useSelector, useDispatch} from 'react-redux'
import {getBlogs} from './reducers/blogsReduxer'
import {setNotification} from './reducers/notificationReducer'
import {setStyle} from './reducers/notificationstyleReducer'
import {setUser} from './reducers/userReducer'
import {getUsers} from './reducers/usersReducers'



const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state=>state.blogs)
  const notification = useSelector(state=>state.notification)
  const user = useSelector(state=>state.user)
  const notistyle = useSelector(state=>state.notistyle)
  const users = useSelector(state=>state.users)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(getBlogs())

  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  },[dispatch])
  console.log('asdasdsad',blogs);
  useEffect(() => {

    const loggedBlogUserJSON = window.localStorage.getItem('loggedBlogUser')
    console.log(loggedBlogUserJSON);
    if(loggedBlogUserJSON){
      const user = JSON.parse(loggedBlogUserJSON)
      dispatch(dispatch({
        type:'LOGIN',
        data: {
          user
        }
      }))
      blogService.setToken(user.token)
    }
  }, [dispatch])
  const sortBlogs = (a,b) => {return b.likes-a.likes}
  const handleClick = () => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch({type:'LOGOUT'})
    dispatch(setNotification('succesfull logout'))
    dispatch(setStyle('good'))
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging as ', username, password)
    try {
      dispatch(setUser(username,password))
      setUsername('')
      setPassword('')
      dispatch(setNotification(`succesfull login as ${username}`  ))
      dispatch(setStyle('good'))
    } catch (error) {
      console.log(error);
      dispatch(setNotification('wrong username of password'))
      dispatch(setStyle('bad'))
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
        <Togglable nimi='add new blog' ref={blogFormRef}>
          <Blogform
            create={blogService.create}
            getAll={blogService.getAll}
            blogFormRef={blogFormRef}
          />
        </Togglable>

        <div className='blogs'>
          <h2>blogs</h2>
          {blogs.sort(sortBlogs).map(blog =>
            <Blog key={blog.id} blog={blog}
              blogFormRef={blogFormRef}
              blogService={blogService}
              user={user}
               />
          )}</div>
      </div>
    )
  }
  console.log(user);
  return (
    <Router>
      <Notification noti={notification} type={notistyle}/>
      {user !== null &&
        <div>
          <p>{user.name} loggeed in</p>
          <button type='button'
            onClick={handleClick}>
          Logout</button>
        </div>
      }
      <Switch>
        <Route path='/users/:id'>
          <User users={users}/>
        </Route>
        <Route path='/users'>
          {user !== null && <Users users={users}/>}
          {user === null && loginForm()}
        </Route>

        <Route path='/'>

          {user !== null &&  blogsForm()}
        </Route>
      </Switch>
      </Router>

  )
}

export default App
