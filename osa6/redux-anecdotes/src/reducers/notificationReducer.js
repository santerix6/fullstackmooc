export const createNotification = (content) => {
  return {
    type: 'create_noti',
    data: {
      content
    }
  }
}
export const defaultti = () => {
  return {
    type: 'defaultti',

  }
}
export const likeNotification = () => {
  return {
    type: 'vote'

  }
}

export const setNotification = (content, time) => {
  return async dispatch => {
     dispatch({
      type: 'noti',
      data: {
        content
      }
    })
    setTimeout(() =>{
      let content = 'notification if needed'
      dispatch({
        type:'noti',
        data: {
          content
        }
      })
    },time*1000) 
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
