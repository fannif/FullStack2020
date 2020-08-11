import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import infoReducer from './reducers/infoReducer'
import userReducer from './reducers/userReducer'
import accountReducer from './reducers/accountReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  info: infoReducer,
  user: userReducer,
  users: accountReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store