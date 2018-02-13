import {h} from "preact"
import {PropTypes as types, element, oneOfType} from "prop-types"

import cn from "classnames"

import {container, primary} from "./button.sss"

const Button = ({children, ...props}) => (
  <div class={cn(container, props.class)}>
    <button class={primary}>{children}</button>
  </div>
)

Button.propTypes = {
  class: types.string,
  children: oneOfType([types.string.isRequired, element.isRequired]).isRequired
}

Button.defaultProps = {
  class: undefined
}

export default Button
