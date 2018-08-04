import React from "react"

import {BrowserRouter, Switch, Route} from "react-router-dom"

import NotFound from "core/page/error/Http/NotFound"

import getRoutes from "./getRoutes"

const routes = getRoutes()

const Router = () => (
  <BrowserRouter>
    <Switch>
      {routes.map(params => <Route key={`route:${params.path}`} {...params} />)}

      {/* Render 404 error when no page found */}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default Router
