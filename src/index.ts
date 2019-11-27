// index.js - entrypoint for the application
// inject hot module reloader and deploy server

import 'cross-fetch/polyfill'
import express from 'express'

// tslint:disable:no-var-requires
let app = require('./server').default

if (module.hot) {
  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...')
    try {
      app = require('./server').default
    } catch (error) {
      console.error(error)
    }
  })
  console.info('✅  Server-side HMR Enabled!')
}

const port = process.env.PORT || 3000

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, () => {
    console.log(`> Started on port ${port}`)
  }).on('error', (err: Error) => {
    console.log(err)
  })
