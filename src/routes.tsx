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
      loader: () => import(/* webpackChunkName: 'About' */ './pages/About'),
    }),
    exact: true,
    name: 'About',
    path: '/about',
  }
]
