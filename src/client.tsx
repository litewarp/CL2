import { After, ensureReady } from '@jaredpalmer/after'
import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import createStore from './root/store/createStore'
import routes from './routes'

const { store } = createStore()

ensureReady(routes).then((data) =>
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <After data={data} routes={routes}/>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  )
);

if (module.hot) {
  module.hot.accept();
}
