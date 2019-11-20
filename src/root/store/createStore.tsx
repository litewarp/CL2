import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createRootReducer from "../reducers";
import logger from 'redux-logger'
import { apiMiddleware } from 'redux-api-middleware'
import { routerMiddleware } from 'connected-react-router'
import paramsMiddleware from '@tshio/redux-api-params-middleware'
import { createBrowserHistory, createMemoryHistory } from 'history'

// helper to determine if rendering on server or client
export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export default (url = '/') => {

  // create history depending on environment
  const history = isServer
    ? createMemoryHistory({ initialEntries: [url], initialIndex: 0 })
    : createBrowserHistory()

  const middleware = [
    paramsMiddleware,
    apiMiddleware,
    thunk,
    routerMiddleware(history),
    logger,
  ]
  const enhancers = []
  // Dev tools are helpful
  if (process.env.NODE_ENV === 'development' && !isServer) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // Do we have preloaded state available? Great, save it.
  const initialState = !isServer ? window.INITIAL_STATE : {}
  // Delete it once we have it stored in a variable
  if (!isServer) {
    delete window.INITIAL_STATE
  }
  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers,
  )
  // create the store

  const store = createStore(
    createRootReducer(history),
    initialState,
    composedEnhancers,
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer(history))
    })
  }
  return { store, history }
};
