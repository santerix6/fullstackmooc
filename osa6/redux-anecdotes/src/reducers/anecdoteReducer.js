const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  if(action.type === 'vote'){
    const aneToChange = state.find(n => n.id ===action.data.id)
    const changedAnecdoe = {
      content: aneToChange.content,
      id: aneToChange.id,
      votes: aneToChange.votes +1
    }
    console.log(changedAnecdoe);
    const new_state = state.map(ane =>
      ane.id !== action.data.id ? ane : changedAnecdoe)
    console.log(new_state);
    return state.map(ane =>
      ane.id !== action.data.id ? ane : changedAnecdoe
    )
  }
  if(action.type ==='create'){
    const uus = asObject(action.data.content)
    console.log(uus);
    return state.concat(uus)
  }
  else {
    return state
  }

}

export default reducer
