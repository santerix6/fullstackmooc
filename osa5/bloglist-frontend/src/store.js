import { createStore, combineReducers, applyMiddleware  } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogsReduxer'
import thunk from 'redux-thunk'


const reducer = blogReducer

const store = createStore(reducer,
                          composeWithDevTools(
                            applyMiddleware(thunk)
                          ))

export default store
