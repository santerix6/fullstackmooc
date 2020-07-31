
let timeout = 0

export const setNotification = (content) => {
  clearTimeout(timeout)
  return async dispatch => {
    timeout = setTimeout(() => {
      const cona = ''
      dispatch({
        type: 'SET',
        data: {
          content:cona
        }
      })
    }, 5000)
    dispatch({
      type:'SET',
      data: {
        content: content
      }
    })
  }
}
const notificationReducer = (state='', action) => {
  switch(action.type) {
    case 'SET':
      console.log(action.data.content);
      return action.data.content
  default:
    return state
  }
}

export default notificationReducer
