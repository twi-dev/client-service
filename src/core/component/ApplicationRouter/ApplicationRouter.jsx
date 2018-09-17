import React from "react"

import {BrowserRouter, Switch} from "react-router-dom"

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
      <ApplicationRoute layout={false} component={NotFoundError} />
    </Switch>
  </BrowserRouter>
)

export default ApplicationRouter
