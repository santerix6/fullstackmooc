import React from 'react'
const Blogform = (props) => {
  return(
  <div>
  <div>
  <h2>Create new blog</h2>
  <form onSubmit={props.handleCreate}>
    <div>
      title<input type='text' value={props.title} name='Title'
      onChange={props.setTitle}/>
    </div>
    <div>
      author<input type='text' value={props.author} name='Author'
      onChange={props.setAuthor}/>
    </div>
    <div>
      url<input type='text' value={props.url} name='Url'
      onChange={props.setUrl}/>
    </div>
    <button type='submit'>submit </button>
  </form>

  </div>

  </div>)
}


export default Blogform
