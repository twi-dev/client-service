import {h} from "preact"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import routes from "core/router"

import "./style/application.sss"

const Application = () => (
  <BrowserRouter>
    <Switch>
      {routes.map(props => <Route {...{...props, exact: true}} />)}

      <Route component={() => <div>404</div>} />
    </Switch>
  </BrowserRouter>
)

export default Application
