import {h} from "preact"
import {PropTypes as types, element, oneOfType} from "prop-types"

import cn from "classnames"
import omit from "lodash/omit"

import {container, primary} from "./button.sss"

const Button = ({children, ...props}) => (
  <div class={cn(container, props.class)}>
    <button {...(omit(props, ["class", "className"]))} class={primary}>
      {children}
    </button>
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
