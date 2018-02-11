import {h} from "preact"
import {PropTypes as types, element, oneOfType} from "prop-types"

import {container, primary} from "./button.sss"

const Button = ({children}) => (
  <div class={container}>
    <button class={primary}>{children}</button>
  </div>
)

Button.propTypes = {
  children: oneOfType([types.string.isRequired, element.isRequired]).isRequired
}

export default Button
