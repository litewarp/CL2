// client.tsx - entrypoint for the client bundle

import { After, ensureReady } from '@jaredpalmer/after'
import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import routes from './routes'

// placement of app in the DOM
const root = document.getElementById('root')

ensureReady(routes).then((data) =>
  hydrate(
    <BrowserRouter>
      <After data={data} routes={routes}/>
    </BrowserRouter>,
    root
  )
);

if (module.hot) {
  module.hot.accept();
}
