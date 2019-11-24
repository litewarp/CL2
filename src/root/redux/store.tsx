// Function to Configure Redux State on Client and Server

// imported from yarn libraries
import paramsMiddleware from '@tshio/redux-api-params-middleware'
import { applyMiddleware, compose, createStore } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// local imports
import createRootReducer from './reducers'

// local helper to determine if rendering on server or client
export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export default (url = '/') => {
  // bundle middlewares - be mindful of order
  const middleware = [
    paramsMiddleware,
    apiMiddleware,
    thunk,
    logger,
  ]

  const enhancers = []
  // inject devToolsExtension if applicable
  if (process.env.NODE_ENV === 'development' && !isServer) {
    // @ts-ignore
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // If server sends preloaded state, use it
  // @ts-ignore
  const initialState = !isServer ? window.INITIAL_STATE : {}
  // Delete it once we have it stored in a variable
  if (!isServer) {
    // @ts-ignore
    delete window.INITIAL_STATE
  }

  // rebuild middlewares
  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers,
  )

  // create the store
  const store = createStore(
    createRootReducer(),
    initialState,
    composedEnhancers,
  )

  // allow hot reloading of reducers
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer(history))
    })
  }

  return { store }
}
