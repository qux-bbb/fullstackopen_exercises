let timeoutID = null

const notificationReducer = (state=null, action) => {
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

export const setNotification = (message, showTime) => {
  return dispatch => {
    if (timeoutID)
      clearTimeout(timeoutID)
    dispatch(notificationChange(message))
    timeoutID = setTimeout(() => {
      dispatch(notificationChange(null))
    }, showTime*1000)
  }
}

export default notificationReducer