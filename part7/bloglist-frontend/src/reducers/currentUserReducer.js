const currentUserReducer = (state=null, action) => {
  switch (action.type) {
    case 'SET_CURRENTUSER':
      return action.currentUser
    default:
      return state
  }
}

export const currentUserChange = (currentUser) => {
  return {
    type: 'SET_CURRENTUSER',
    currentUser,
  }
}

export default currentUserReducer