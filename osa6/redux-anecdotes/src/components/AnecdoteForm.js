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
    let a = props.setNotification(`You created ${content}`,8)
    console.log('saas',a);

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
