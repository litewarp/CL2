import { render } from '@jaredpalmer/after'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import routes from './routes'

import Document from './root/layout/Document'
import createStore from './root/redux/store'

// @ts-ignore
// tslint:disable:no-var-requires
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || ''))
  .get('/*', async (req, res) => {
    try {
      // create store based on request
      const { store } = createStore(req.url);
      // render app to static string using react server
      // return the current state with the static string
      const customRenderer = (node: React.ReactNode) => {
        const App = (
          <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
              {node}
            </StaticRouter>
          </Provider>
        )
        return {
          html: renderToString(App),
          serverState: store.getState()
        }
      }
      // send the following to the renderer
      const html = await render({
        assets,
        customRenderer,
        document: Document,
        req,
        res,
        routes
      });
      res.send(html);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

export default server;
