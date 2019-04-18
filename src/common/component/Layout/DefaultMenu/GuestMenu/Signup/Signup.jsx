import {createElement} from "react"
import {shape, string} from "prop-types"
import {withRouter} from "react-router-dom"

import {Element} from "common/component/SidebarMenu/Element"

const Signup = ({match}) => (
  <Element href={`/auth/signup?redirect=${match.path}`}>
    Signup
  </Element>
)

Signup.propTypes = {
  match: shape({path: string.isRequired}).isRequired
}

export default Signup |> withRouter
