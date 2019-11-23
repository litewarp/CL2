import { connectRouter } from 'connected-react-router'
// type definition for history object
import { History } from 'history'
import { combineReducers } from 'redux'
import homeReducer from './homeReducer'

export default (history: History) =>
  combineReducers({
    home: homeReducer,
    router: connectRouter(history),
  })
