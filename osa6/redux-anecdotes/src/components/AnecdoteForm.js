import React from 'react'
import {createNotification, defaultti} from '../reducers/notificationReducer'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {  useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'
const AnecdoteForm = (props) => {
  const create = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newNote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newNote))
    dispatch(createNotification(newNote))
    setTimeout(() => {
      dispatch(defaultti())
    },5000)
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
