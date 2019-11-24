import { combineReducers } from 'redux'
import { homeReducer } from './home'
import { layoutReducer } from './layout'

export default () =>
  combineReducers({
    home: homeReducer,
    layout: layoutReducer,
  })
