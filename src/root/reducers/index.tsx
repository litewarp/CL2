import { combineReducers } from 'redux'
import { layoutReducer } from '../actions/layoutActions'
import homeReducer from './homeReducer'

export default () =>
  combineReducers({
    home: homeReducer,
    layout: layoutReducer,
  })
