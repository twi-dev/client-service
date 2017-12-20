import {h} from "preact"
import {string, element, arrayOf, shape} from "prop-types"
import {Switch, Route} from "react-router-dom"

const Router = ({routes}) => (
  <Switch>
    {routes.map(props => <Route {...props} />)}
  </Switch>
)

Router.propTypes = {
  routes: arrayOf(shape({
    path: string.isRequired,
    component: element.isRequired
  })).isRequired
}

export default Router
