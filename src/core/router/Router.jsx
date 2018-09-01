import React from "react"

import {BrowserRouter, Switch, Route} from "react-router-dom"

import NotFoundError from "core/component/Error/NotFoundError"

import getRoutes from "./getRoutes"

const routes = getRoutes()

const Router = () => (
  <BrowserRouter>
    <Switch>
      {
        routes.map(({path, ...props}) => (
          <Route {...{...props, path}} key={`key::(${path})`} />
        ))
      }

      {/* Render 404 error when no page found */}
      <Route component={NotFoundError} />
    </Switch>
  </BrowserRouter>
)

export default Router
