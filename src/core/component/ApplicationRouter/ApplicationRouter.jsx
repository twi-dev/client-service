import React from "react"

import {BrowserRouter, Switch} from "react-router-dom"

import NotFoundError from "core/component/Error/NotFoundError"

import getRoutes from "./getRoutes"
import Route from "./ApplicationRoute"

const routes = getRoutes()

const ApplicationRouter = () => (
  <BrowserRouter>
    <Switch>
      {routes.map(route => <Route {...route} key={`key::(${route.path})`} />)}

      {/* Render 404 error when no page found */}
      <Route layout={false} component={NotFoundError} />
    </Switch>
  </BrowserRouter>
)

export default ApplicationRouter
