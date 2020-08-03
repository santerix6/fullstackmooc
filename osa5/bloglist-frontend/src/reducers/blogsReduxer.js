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
    console.log(updatedBlog,'up');
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

export const addComment = (id, comm) => {
  return async dispatch => {
    console.log('test2',comm);
    const cmtblg = await blogService.comment(id,comm)
    console.log('testi5',cmtblg);
    dispatch({
      type:'COMMENT',
      data: {
        cmtblg
      }
    })
  }
}

const blogReducer = (state = [], action) => {
  if(action.type === 'GETBLOGS'){
    console.log(action.data);
    return action.data
  }
  if(action.type === 'CREATE'){
    console.log('crt',action.data);
    return state.concat(action.data.newBlog)
  }
  if(action.type === 'LIKE'){
    console.log('like',action.data);
    return state.map(blog =>
      blog.id !== action.data.updatedBlog.id ? blog : action.data.updatedBlog
    )
  }
  if(action.type ==='DELETE'){
    return state.filter(blog => blog.id !== action.data.id)
  }
  if(action.type ==='COMMENT'){
    console.log('awer', action.data.cmtblg);
    return state.map(blog =>
      blog.id !== action.data.cmtblg.id ? blog : action.data.cmtblg
    )
  }
  return state
}

export default blogReducer
