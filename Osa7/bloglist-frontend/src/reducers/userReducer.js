import blogService from '../services/blogs'
import loginService from '../services/login'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return state = action.data
  case 'LOGOUT':
    return state = null
  default: return state
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password
    })

    window.localStorage.setItem(
      'loggedBloglistUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken('')
    setUser(null)
    dispatch({ type: 'LOGOUT' })
  }
}

export const setUser = (loggedUserJSON) => {
  return dispatch => {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export default userReducer