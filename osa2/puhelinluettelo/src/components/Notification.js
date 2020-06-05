import React from 'react'

const Notification = (props) => {
  if(props.message === null) {return null}
  const notistyle = {
    backgroundColor  : 'silver',
    border: '2px solid green',
    fontSize : 20,
    color: 'green',
    borderRadius : 5,
  }
  const pstyle = {
    margin : 10,
  }
  return (
    <div style={notistyle}>
      <p style={pstyle}>{props.message}</p>
    </div>
  )
}
export default Notification
