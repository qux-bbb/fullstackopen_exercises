import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.message === null) {
    return null
  }

  if (notification.messageType === 'info')
    return (
      <Alert variant="success">
        {notification.message}
      </Alert>
    )
  else // error message
    return (
      <Alert variant="danger">
        {notification.message}
      </Alert>
    )
}

export default Notification