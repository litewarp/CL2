// server.tsx - entrypoint for the server
// request hits server, server dispatches
// getInitialProps functions and serves
// the rendered html template and the js bundle,
// and the rest is hydrated through the client

import { render } from '@jaredpalmer/after'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import routes from './routes'

import HtmlTemplate from './root/layout/HtmlTemplate'
import createStore from './root/redux/store'

// @ts-ignore
// tslint:disable:no-var-requires
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()

server
  .disable('x-powered-by')
  // serve static assets (css, js bundle, images, etc.)
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || ''))
  // entrypoint of the server
  .get('/*', async (req, res) => {
    try {
      // create application state based on request
      const { store } = createStore(req.url);
      // render the application as a static string and
      // send the html template string along with the
      // current application state (as serialized json)
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
      // send the following data to the renderer
      const html = await render({
        assets,
        customRenderer,
        document: HtmlTemplate,
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

export default server
