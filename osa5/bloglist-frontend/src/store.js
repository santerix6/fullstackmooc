import { createStore, combineReducers, applyMiddleware  } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogsReduxer'
import notificationReducer from './reducers/notificationReducer'
import notificationstyleReducer from './reducers/notificationstyleReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducers'
import thunk from 'redux-thunk'


const reducer = combineReducers({
  blogs : blogReducer,
  notification: notificationReducer,
  notistyle: notificationstyleReducer,
  user: userReducer,
  users: usersReducer,
})

const store = createStore(reducer,
                          composeWithDevTools(
                            applyMiddleware(thunk)
                          ))

export default store
