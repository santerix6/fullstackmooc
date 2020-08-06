import blogService from '../services/blogs'
import loginService from '../services/login'
export const setUser = (username, password) => {
  return async dispatch => {
  
      const user = await loginService.login({ username, password })
      console.log('2345',user);
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type:'LOGIN',
        data: {
          user
        }
      })


  }
}

const userReducer = (state=null,action) => {
  switch(action.type){
    case 'LOGIN':
      return action.data.user
    case 'LOGOUT':
      return null

    default:
      return state
  }
}

export default userReducer
