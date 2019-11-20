import postsReducer from "./postsReducer";
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

export default (history) =>
  combineReducers({
    posts: postsReducer,
    router: connectRouter(history),
  })
