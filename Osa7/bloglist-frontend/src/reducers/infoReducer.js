const infoReducer = (state = [], action) => {
  switch (action.type) {
  case 'SHOW':
    return state.concat(action.data)
  case 'HIDE':
    return state.filter(id => id !== action.data)
  default: return state
  }
}

export const showInfo = (id) => {
  return dispatch => {
    dispatch({
      type: 'SHOW',
      data: id
    })
  }
}

export const hideInfo = (id) => {
  return dispatch => {
    dispatch({
      type: 'HIDE',
      data: id
    })
  }
}

export default infoReducer