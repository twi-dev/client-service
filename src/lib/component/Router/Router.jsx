import {BrowserRouter, Switch} from "react-router-dom"
import {createElement, lazy} from "react"

import getRoutes from "./getRoutes"
import Route from "./Route"

const NotFoundError = lazy(() => import("lib/component/Error/NotFoundError"))

const routes = getRoutes()

const Router = () => (
  <BrowserRouter>
    <Switch>
      {routes.map(route => <Route {...route} key={`path::(${route.path})`} />)}

      {/* Render 404 error when no page found */}
      <Route page={{layout: false, component: NotFoundError}} />
    </Switch>
  </BrowserRouter>
)

Router.displayName = "ApplicationRouter"

export default Router
