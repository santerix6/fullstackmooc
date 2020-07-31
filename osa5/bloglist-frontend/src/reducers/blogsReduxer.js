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
export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type:'CREATE',
      data: {
        newBlog
      }
    })
  }
}
export const likeBlog = (id,content) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, content)
    dispatch({
      type: 'LIKE',
      data: {
        updatedBlog
      }
    })
  }
}
export const deleteBlog = (id) => {
  return async dispatch => {
    const removedBlog = await blogService.remove(id)
    console.log('asdsadasd',removedBlog)
    dispatch({
      type:'DELETE',
      data: {id}
    })
  }
}

const blogReducer = (state = [], action) => {
  if(action.type === 'GETBLOGS'){
    console.log(action.data);
    return action.data
  }
  if(action.type === 'CREATE'){
    console.log(action.data);
    return state.concat(action.data.newBlog)
  }
  if(action.type === 'LIKE'){
    return state.map(blog =>
      blog.id !== action.data.updatedBlog.id ? blog : action.data.updatedBlog
    )
  }
  if(action.type ==='DELETE'){
    return state.filter(blog => blog.id !== action.data.id)
  }
  return state
}

export default blogReducer
