import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import createStore from "./root/store/createStore";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { ensureReady, After } from "@jaredpalmer/after";
import routes from "./routes";
import { ConnectedRouter } from 'connected-react-router'

const { store, history } = createStore();

ensureReady(routes).then(data =>
  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <After data={data} routes={routes} store={store} />
      </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
  )
);

if (module.hot) {
  module.hot.accept();
}
