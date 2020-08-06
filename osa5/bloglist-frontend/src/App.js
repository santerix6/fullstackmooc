import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Blogform from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import { BrowserRouter as Router,
          Switch, Route,Link
        } from "react-router-dom"
import blogService from './services/blogs'
import {useSelector, useDispatch} from 'react-redux'
import {getBlogs} from './reducers/blogsReduxer'
import {setNotification} from './reducers/notificationReducer'
import {setStyle} from './reducers/notificationstyleReducer'
import {setUser} from './reducers/userReducer'
import {getUsers} from './reducers/usersReducers'
import {Table, Form, Button, Navbar, Nav} from 'react-bootstrap'


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
    try {
      dispatch(setUser(username,password))
      setUsername('')
      setPassword('')
      dispatch(setNotification(`succesfull login as ${username}`  ))
      dispatch(setStyle('good'))
    } catch (error) {
      console.log('vituiks män')
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
    <div>
    <h1>Login</h1>
    <Form onSubmit={handleLogin}>
      <Form.Group>
      <div>
        <Form.Label>username:</Form.Label>
        <Form.Control type='text' value={username} name='Username' id='username'
          onChange={handleUsername}/>
      </div>
      <div>
        <Form.Label>password:</Form.Label>
         <Form.Control type='password' value={password} name='Password' id='password'
          onChange={({ target }) => setPassword(target.value)}/>
      </div>
      </Form.Group>
      <Button id='login-button' type='submit'>login </Button>
    </Form>
    </div>
  )

  const blogsForm = () => {
    //sortBlogs()
    return (
      <div>
        <h2>blogs</h2>
        <Togglable nimi='add new blog' ref={blogFormRef}>
          <Blogform
            create={blogService.create}
            getAll={blogService.getAll}
            blogFormRef={blogFormRef}
          />
        </Togglable>

        <div className='blogs'>

          <Table striped>
          <tbody>
          {blogs.sort(sortBlogs).map(blog =>
            <tr key={blog.id}>
              <td><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author} </Link></td>
            </tr>
          )}
          </tbody>
          </Table>
          </div>
      </div>
    )
  }
  console.log(user);
  return (
    <Router>

      <Notification noti={notification} type={notistyle}/>
      {user !== null &&
        <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/"><Link to='/'>blogs </Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#"><Link to='/users'>Users </Link></Nav.Link>
            </Nav>
            <Nav className="mr-auto">
              <Navbar.Text>
                {user.name} loggeed in
              </Navbar.Text>
            </Nav>
            <Button type='button'
              onClick={handleClick}>
            Logout</Button>
          </Navbar.Collapse>
        </Navbar>
          
        </div>
      }
      <Switch>
        <Route path='/users/:id'>
          {user !== null &&<User users={users}/>}
          {user === null && loginForm()}
        </Route>
        <Route path='/users'>
          {user !== null && <Users users={users}/>}
          {user === null && loginForm()}
        </Route>
        <Route path='/blogs/:id'>
          {user !== null && <Blog blogs={blogs}
            blogFormRef={blogFormRef}
            blogService={blogService}
            user={user}
             />}
            {user === null && loginForm()}
        </Route>
        <Route path='/'>
          {user === null && loginForm()}
          {user !== null &&  blogsForm()}
        </Route>
      </Switch>
      </Router>

  )
}

export default App
