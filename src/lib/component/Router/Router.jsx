import {BrowserRouter, Switch} from "react-router-dom"
import {createElement} from "react"

import NotFoundError from "lib/component/Error/NotFoundError"

import getRoutes from "./getRoutes"
import Route from "./Route"

const routes = getRoutes()

const Router = () => (
  <BrowserRouter>
    <Switch>
      {routes.map(route => <Route {...route} key={`key::(${route.path})`} />)}

      {/* Render 404 error when no page found */}
      <Route page={{layout: false, component: NotFoundError}} />
    </Switch>
  </BrowserRouter>
)

Router.displayName = "ApplicationRouter"

export default Router
