import blogService from '../services/blogs'

export const getBlogs = () => {
  return async dispatch =>{
    const blogs = await blogService.getAll()
    console.log(blogs);
    dispatch({
      type: 'GETBLOGS',
      data: blogs
    })
  }
}


const blogReducer = (state = [], action) => {
  if(action.type === 'GETBLOGS'){
    console.log(action.data);
    return action.data
  }
  return state
}

export default blogReducer
