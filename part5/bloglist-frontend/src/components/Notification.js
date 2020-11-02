import React from 'react'

const Notification = ({ message, messageType }) => {
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

  if (message === null) {
    return null
  }

  if (messageType === 'info')
    return (
      <div style={infoStyle}>
        {message}
      </div>
    )
  else // error message
    return (
      <div style={errorStyle}>
        {message}
      </div>
    )
}

export default Notification