import { combineReducers } from 'redux'
import { homeReducer } from '../actions/homeActions'
import { layoutReducer } from '../actions/layoutActions'

export default () =>
  combineReducers({
    home: homeReducer,
    layout: layoutReducer,
  })
