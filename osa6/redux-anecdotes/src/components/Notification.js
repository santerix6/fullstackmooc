import React from 'react'
import { useSelector } from 'react-redux'
const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const noti = useSelector(state => state.notification)
  return (
    <div style={style}>
      {noti}
    </div>
  )
}

export default Notification
