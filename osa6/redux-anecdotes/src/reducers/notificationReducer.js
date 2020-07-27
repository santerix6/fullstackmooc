let timeout = 0

export const setNotification = (content, time) => {
  clearTimeout(timeout)
  return async dispatch => {
     timeout = setTimeout(() =>{
       let content = 'notification if needed'
       dispatch({
         type:'noti',
         data: {
           content
         }
       })
     },time*1000)
     dispatch({
      type: 'noti',
      data: {
        content:content,
        timeout:timeout
      }
    })

  }
}
const notificationReducer = (state = 'Message for all notis', action) => {
  switch (action.type) {
    case 'noti':
      console.log('test', action.data.content);
      return action.data.content
    default:
      console.log(state)
      return state
  }
}
export default notificationReducer
