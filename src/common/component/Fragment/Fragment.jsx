import {h} from "preact"
import {PropTypes as types, element, arrayOf} from "prop-types"

import cn from "classnames"

import {container} from "./fragment.sss"

/**
 * Just a fragment hack using "div" with inherit styles
 */
const Fragment = ({children, ...props}) => (
  <div class={cn(container, props.class)}>
    {children}
  </div>
)

Fragment.propTypes = {
  class: types.string,
  children: arrayOf(element.isRequired).isRequired
}

Fragment.defaultProps = {
  class: undefined
}

export default Fragment
