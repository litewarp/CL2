/** @format */

// server.tsx - entrypoint for the server
// request hits server, server dispatches
// getInitialProps functions and serves
// the rendered html template and the js bundle,
// and the rest is hydrated through the client

import { render } from '@jaredpalmer/after'
import express from 'express'
import routes from './routes'

import HtmlTemplate from './root/layout/HtmlTemplate'

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
      // send the following data to the renderer
      const html = await render({
        assets,
        document: HtmlTemplate,
        req,
        res,
        routes,
      })
      res.send(html)
    } catch (error) {
      console.log(error)
      res.json(error)
    }
  })

export default server
