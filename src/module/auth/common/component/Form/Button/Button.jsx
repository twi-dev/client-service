import React from "react"
import cn from "classnames"
import omit from "lodash/omit"

import {PropTypes as types, element, oneOfType} from "prop-types"

import {container, primary} from "./button.sss"

const Button = ({children, ...props}) => (
  <div className={cn(container, props.className)}>
    <button {...(omit(props, "className"))} className={primary}>
      {children}
    </button>
  </div>
)

Button.propTypes = {
  className: types.string,
  children: oneOfType([types.string.isRequired, element.isRequired]).isRequired
}

Button.defaultProps = {
  className: undefined
}

export default Button
