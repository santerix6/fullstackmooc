import React from 'react'
import {setNotification} from '../reducers/notificationReducer'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {  connect } from 'react-redux'
const AnecdoteForm = (props) => {
  const create = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.createAnecdote(content)
    props.setNotification(`You created ${content}`,5)

  }
  return (<div>
            <h2>create new</h2>
            <form onSubmit={create}>
            <div><input name='anecdote' /></div>
            <button >create</button>
            </form>
          </div>)
}
const mapDispatchToProps  = {
  createAnecdote, setNotification,
}
export default connect(null, mapDispatchToProps)(AnecdoteForm)
