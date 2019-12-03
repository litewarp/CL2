// routes.tsx - router entrypoint for react router 4

import { asyncComponent } from '@jaredpalmer/after'
import * as React from 'react'

export default [
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import(/* webpackChunkName: 'Home' */ './pages/home/Home'), // required
    }),
    exact: true,
    name: 'Home',
    path: '/',
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import(/* webpackChunkName: 'Home' */ './pages/about/About'), // required
    }),
    exact: true,
    name: 'About',
    path: '/about',
  },
]
