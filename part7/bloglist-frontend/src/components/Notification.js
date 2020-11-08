import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const infoStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (notification.message === null) {
    return null
  }

  if (notification.messageType === 'info')
    return (
      <div style={infoStyle}>
        {notification.message}
      </div>
    )
  else // error message
    return (
      <div  className='error' style={errorStyle}>
        {notification.message}
      </div>
    )
}

export default Notification