import {h} from "preact"
import {observer} from "mobx-preact"
import {PropTypes as types, boolean} from "prop-types"

import cn from "classnames"
import omit from "lodash/omit"

import {container, warn} from "./input.sss"

// TODO: Don't forget to finish validation feature
const Input = props => (
  <div className={cn(container, props.class)}>
    <div class={warn}>The username is already taken</div>
    <input {...(omit(props, ["class", "className"]))} />
  </div>
)

Input.propTypes = {
  isValid: boolean,
  warn: types.string,
  class: types.string
}

Input.defaultProps = {
  isValid: false,
  warn: types.string,
  class: undefined
}

export default observer(Input)
