import { ensureReady, After } from '@jaredpalmer/after';
import { ConnectedRouter } from 'connected-react-router'
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import createStore from './root/store/createStore';
import routes from './routes';

const { store, history } = createStore();

ensureReady(routes).then((data) =>
  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <After data={data} routes={routes} store={store} />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  )
);

if (module.hot) {
  module.hot.accept();
}
