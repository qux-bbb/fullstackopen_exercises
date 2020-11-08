const notificationAtStart = {
  message: null,
  messageType: 'info'  // 'info' o 'error'
}

const notificationReducer = (state=notificationAtStart, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

const notificationChange = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}

export const setNotification = (message, messageType) => {
  return dispatch => {
    dispatch(notificationChange({ message, messageType }))
    setTimeout(() => {
      dispatch(notificationChange(notificationAtStart))
    }, 5000)
  }
}

export default notificationReducer