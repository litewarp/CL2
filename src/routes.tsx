import React from "react";

import { asyncComponent } from "@jaredpalmer/after";

export default [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: asyncComponent({
      loader: () => import(/* webpackChunkName: "Home" */ "./pages/Home"), // required
      Placeholder: () => <div>...LOADING...</div>
    })
  },
  {
    name: "About",
    path: "/about",
    exact: true,
    component: asyncComponent({
      loader: () => import(/* webpackChunkName: "About" */ "./pages/About"),
      Placeholder: () => <div>...LOADING...</div>
    })
  }
];
