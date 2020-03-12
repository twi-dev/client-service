import {Link as Base, NavLink} from "react-router-dom"
import {oneOf, bool, string} from "prop-types"
import {createElement} from "react"

import cn from "classnames"
import get from "lodash/get"

import forwardRef from "lib/hoc/forwardRef"

import {primary, secondary} from "./link.css"

const colors = {primary, secondary}

function Link(props) {
  const {
    forwardedRef, external, nav, to, color, className, activeClassName,

    ...rest
  } = props

  const LinkComponent = nav ? NavLink : Base

  return createElement(
    external ? "a" : LinkComponent,

    {
      ...rest,
      ...(external ? {href: to} : {to}),
      ...(nav && {exact: true, activeClassName}),

      className: cn(get(colors, String(color), primary), className)
    }
  )
}

Link.propTypes = {
  ...forwardRef.propTypes,

  className: string,
  color: oneOf(["primary", "secondary"]),
  external: bool,
  nav: bool,
}

Link.defaultProps = {
  ...forwardRef.defaultProps,

  className: undefined,
  color: "primary",
  external: false,
  nav: false
}

export default Link |> forwardRef
