import React from "react"

import {BrowserRouter, Switch, Route} from "react-router-dom"

import NotFoundError from "core/component/Error/NotFoundError"

import getRoutes from "./getRoutes"
import ApplicationRoute from "./ApplicationRoute"

const routes = getRoutes()

const ApplicationRouter = () => (
  <BrowserRouter>
    <Switch>
      {
        routes.map(({path, ...props}) => (
          <ApplicationRoute {...{...props, path}} key={`key::(${path})`} />
        ))
      }

      {/* Render 404 error when no page found */}
      <Route component={NotFoundError} />
    </Switch>
  </BrowserRouter>
)

export default ApplicationRouter
