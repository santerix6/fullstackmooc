import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { defaultti} from '../reducers/notificationReducer'
import {voreFunc} from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => state.anecdotes)
  const filtter = useSelector(state => state.filter)
  const filteredlist = anecdotes.filter(anecdote => {
    return anecdote.content.toLowerCase().includes(filtter.toLowerCase())
  })
  const byVotes = (v1,v2)=> v2.votes - v1.votes
  const like = (content) => {
    dispatch(voreFunc(content))
    setTimeout(() => {
      dispatch(defaultti())
    },5000)
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {filteredlist.sort(byVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => like(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default AnecdoteList
