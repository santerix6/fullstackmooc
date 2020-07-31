import React from 'react'
const Notification = (props) => {
  if(props.noti === '') {return null}
  const notistyle = {
    backgroundColor  : 'silver',
    border: '2px solid green',
    fontSize : 20,
    color: 'green',
    borderRadius : 5,
  }
  const notistyleb = {
    backgroundColor  : 'silver',
    border: '2px solid red',
    fontSize : 20,
    color: 'red',
    borderRadius : 5,
  }
  const pstyle = {
    margin : 10,
  }
  if(props.type ==='good'){
    return (
      <div style={notistyle}>
        <p style={pstyle}>{props.noti}</p>
      </div>
    )
  } else{
    return (
      <div style={notistyleb} className='error'>
        <p style={pstyle}>{props.noti}</p>
      </div>
    )
  }

}
export default Notification
