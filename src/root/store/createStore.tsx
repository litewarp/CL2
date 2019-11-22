import paramsMiddleware from '@tshio/redux-api-params-middleware'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory, createMemoryHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import createRootReducer from '../reducers'

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
    // @ts-ignore
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // Do we have preloaded state available? Great, save it.
  // @ts-ignore
  const initialState = !isServer ? window.INITIAL_STATE : {}
  // Delete it once we have it stored in a variable
  if (!isServer) {
    // @ts-ignore
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
