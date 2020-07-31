export const setStyle = (content) => {
  return async dispatch => {
    dispatch({
      type:'SETT',
      data: {
        content: content
      }
    })
  }
}
const notificationstyleReducer = (state='', action) => {
  switch(action.type) {
    case 'SETT':
      return action.data.content

  default:
    return state
  }
}
export default notificationstyleReducer
