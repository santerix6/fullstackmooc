
export const changefilter = (content) => {
  return {
    type: 'change',
    data: {content}
  }
}



const filterReducer = (state='', action) => {
  switch (action.type) {
    case 'change':
      return action.data.content
    default:
      return state
  }

}

export default filterReducer
