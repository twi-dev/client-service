import React from "react"
import {shape, string} from "prop-types"

import withRouter from "react-router-dom/withRouter"

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
