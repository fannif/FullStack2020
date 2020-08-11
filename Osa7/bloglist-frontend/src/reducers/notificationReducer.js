var timeoutID = 0

const notificationReducer = (state = { text:'', type:'notify' }, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'REMOVE_NOTIFICATION':
    return { text:'', type:'notify' }
  default:
    return state
  }
}

export const setNotification = (notification, timer) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' })
    }, timer * 1000)
  }
}

export default notificationReducer