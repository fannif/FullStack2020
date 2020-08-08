const notificationReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.notification
      case 'REMOVE_NOTIFICATION':
        return ''
      default: return state
    }
}

export const showNotification = (notification, timer) => {
    return async dispatch => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification
      })
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION'})
      }, timer * 1000)
    }
}

// export const addNotification = (notification) => {
//     return async dispatch => {
//       dispatch({
//         type: 'SET_NOTIFICATION',
//         notification
//       })
//     }
// }

// export const removeNotification = () => {
//     return async dispatch => {
//     dispatch ({
//       type: 'REMOVE_NOTIFICATION'
//     })
//   }
// }

export default notificationReducer