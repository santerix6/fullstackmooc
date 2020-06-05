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
  const notistyleb = {
    backgroundColor  : 'silver',
    border: '2px solid red',
    fontSize : 20,
    color: 'red',
    borderRadius : 5,
  }
  if(props.message.includes('from server')){
    return (
      <div style={notistyleb}>
        <p style={pstyle}>{props.message}</p>
      </div>
    )
  }
  return (
    <div style={notistyle}>
      <p style={pstyle}>{props.message}</p>
    </div>
  )
}
export default Notification
