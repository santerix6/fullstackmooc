import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voreFunc} from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => state)
  const byVotes = (v1,v2)=> v2.votes - v1.votes
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(byVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voreFunc(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default AnecdoteList
