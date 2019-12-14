/** @format */

// routes.tsx - router entrypoint for react router 4

import { asyncComponent } from '@jaredpalmer/after'
import * as React from 'react'

export default [
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import(/* webpackChunkName: 'Home' */ './pages/home'), // required
    }),
    exact: true,
    name: 'Home',
    path: '/',
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import(/* webpackChunkName: 'Home' */ './pages/about'), // required
    }),
    exact: true,
    name: 'About',
    path: '/about',
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import(/* webpackChunkName: 'Home' */ './pages/donate'), // required
    }),
    exact: true,
    name: 'Donate',
    path: '/donate',
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import(/* webpackChunkName: 'Home' */ './pages/courts'), // required
    }),
    exact: true,
    name: 'Jurisdictions',
    path: '/jurisdictions',
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import('./pages/citations'),
    }),
    exact: true,
    name: 'Citations',
    path: '/c',
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import('./pages/opinions'),
    }),
    exact: true,
    name: 'Opinions',
    path: '/opinion',
  },
]
