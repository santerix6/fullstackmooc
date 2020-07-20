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
const notificationReducer = (state = 'Message for all notis', action) => {
  switch (action.type) {
    case 'create_noti':
      let retstring = 'You added '+action.data.content
      return retstring
    case 'defaultti':
      return 'Message for all notis'
    case 'vote':
      return 'You voted ' + action.data.content
    default:
      console.log(state)
      return state
  }
}
export default notificationReducer
