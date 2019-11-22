import { render } from '@jaredpalmer/after';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import routes from './routes';

import Document from './root/Document';
import createStore from './root/store/createStore';

// @ts-ignore
// tslint:disable:no-var-requires
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    try {

      const { store, history } = createStore(req.url);
      const customRenderer = (node: React.ReactNode) => {
        const App = <Provider store={store}>{node}</Provider>
        return {
          html: renderToString(App),
          serverState: store.getState()
        }
      }
      const html = await render({
        assets,
        customRenderer,
        document: Document,
        req,
        res,
        routes,
        store
      });
      res.send(html);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

export default server;
