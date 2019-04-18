import {withRouter} from "react-router-dom"
import {shape, string} from "prop-types"
import {createElement} from "react"

import {Element} from "common/component/SidebarMenu/Element"

const Login = ({match}) => (
  <Element href={`/auth/login?redirect=${match.path}`}>
    Login
  </Element>
)

Login.propTypes = {
  match: shape({path: string.isRequired}).isRequired
}

export default Login |> withRouter
