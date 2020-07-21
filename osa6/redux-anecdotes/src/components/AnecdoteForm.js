import React from 'react'
import {setNotification} from '../reducers/notificationReducer'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {  useDispatch } from 'react-redux'
const AnecdoteForm = (props) => {
  const create = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(createAnecdote(content))
    dispatch(setNotification(`You created ${content}`,5))

  }
  const dispatch = useDispatch()
  return (<div>
            <h2>create new</h2>
            <form onSubmit={create}>
            <div><input name='anecdote' /></div>
            <button >create</button>
            </form>
          </div>)
}
export default AnecdoteForm
