import React, { useState, useImperativeHandle } from 'react'


const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

  const toggleVisibilty = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return {
      toggleVisibilty, visible
    }
  })
  return (
    <div>
      <div style ={hideWhenVisible}>
        <button onClick={toggleVisibilty}>{props.nimi}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibilty}>cancel</button>
      </div>
    </div>
  )
})
export default Togglable
