import {h} from "preact"
import {Switch, Route} from "react-router-dom"

import NotFound from "core/page/error/Http/NotFound"

import getRoutes from "./getRoutes"

const routes = getRoutes()

const Routes = () => (
  <Switch>
    {routes.map(props => <Route {...props} />)}

    {/* Render 404 error when no page found */}
    <Route component={NotFound} />
  </Switch>
)

export default Routes
