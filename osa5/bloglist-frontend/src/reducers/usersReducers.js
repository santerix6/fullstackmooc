import usersService from '../services/users'

export const getUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    console.log('redux', users);
    dispatch({
      type: 'GETUSERS',
      data: {users}
    })
  }
}

const usersReducer = (state=[], action) => {
  switch (action.type) {
    case 'GETUSERS':
      return action.data.users

    default:
      return state
  }
}

export default usersReducer
