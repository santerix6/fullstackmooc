
export const createAnecdote = (content) => {
    return {
      type:'create',
      data: {
        content
      }
    }
}

export const voreFunc = (id,content) => {

  return {
    type: 'vote',
    data:{id,content}
  }
}

export const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {
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

    return state.concat(action.data.content)
  }
  if(action.type === 'init_anecdotes'){
    return action.data
  }
  else {
    return state
  }
}
export const initalizeAnecdotes = (anecdotes) => {
  return {
    type: 'init_anecdotes',
    data: anecdotes
  }
}



export default reducer
