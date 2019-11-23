import { connectRouter } from 'connected-react-router'
// type definition for history object
import { History } from 'history'
import { combineReducers } from 'redux'
import postsReducer from './postsReducer'

export default (history: History) =>
  combineReducers({
    posts: postsReducer,
    router: connectRouter(history),
  })
