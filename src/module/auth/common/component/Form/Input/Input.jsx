import {h} from "preact"
import {PropTypes as types} from "prop-types"

import cn from "classnames"
import omit from "lodash/omit"

import {container} from "./input.sss"

const Input = props => (
  <div className={cn(container, props.class)}>
    <input {...{...omit(props, ["class", "className"])}} />
  </div>
)

Input.propTypes = {
  class: types.string
}

Input.defaultProps = {
  class: undefined
}

export default Input
