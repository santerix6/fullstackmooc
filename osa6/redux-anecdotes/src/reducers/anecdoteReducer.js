import anecdoteService from '../services/anecdotes'


export const createAnecdote = (content) => {
    return async dispatch => {
      const newNote = await anecdoteService.createNew(content)
      dispatch({
        type:'create',
        data: {
          newNote
        }})
    }
}

export const voreFunc = (content) => {

  return async dispatch => {
    const updatedObj = {
      content: content.content,
      id: content.id,
      votes: content.votes +1
    }

    const res = await anecdoteService.update(content.id, updatedObj)
    console.log(res)
    dispatch({
      type: 'vote',
      data: {
        res
      }
    })
  }
}

export const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  if(action.type === 'vote'){
    console.log();
    return state.map(ane =>
      ane.id !==action.data.res.id ? ane : action.data.res
    )
  }
  if(action.type ==='create'){

    return state.concat(action.data.newNote)
  }
  if(action.type === 'init_anecdotes'){
    return action.data
  }
  else {
    return state
  }
}
export const initalizeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'init_anecdotes',
      data: anecdotes})
  }
}



export default reducer
