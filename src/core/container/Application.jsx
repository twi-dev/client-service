import {h} from "preact"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import routes from "core/router"

import "./style/application.sss"

const Application = () => (
  <BrowserRouter>
    <Switch>
      {routes.map(({path, component}) => <Route {...{path, component}} />)}
    </Switch>
  </BrowserRouter>
)

export default Application
