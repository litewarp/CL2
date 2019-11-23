import { After, ensureReady } from '@jaredpalmer/after';
import { ConnectedRouter } from 'connected-react-router'
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './root/store/createStore';
import routes from './routes';

const { store, history } = createStore();

ensureReady(routes).then((data) =>
  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <After data={data} routes={routes}/>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  )
);

if (module.hot) {
  module.hot.accept();
}
