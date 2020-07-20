const notificationReducer = (state = 'Message for all notis', action) => {
  switch (action.type) {

    default:
      console.log(state)
      return state
  }
}
export default notificationReducer
