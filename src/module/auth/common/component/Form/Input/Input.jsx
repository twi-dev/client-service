import React from "react"
import cn from "classnames"
import omit from "lodash/omit"

import {observer} from "mobx-react"
import {PropTypes as types, boolean} from "prop-types"

import {container, warn} from "./input.scss"

// TODO: Don't forget to finish validation feature
const Input = props => (
  <div className={cn(container, props.className)}>
    <div className={warn}>The username is already taken</div>
    <input {...(omit(props, "className"))} />
  </div>
)

Input.propTypes = {
  isValid: boolean,
  warn: types.string,
  className: types.string
}

Input.defaultProps = {
  isValid: false,
  warn: types.string,
  className: undefined
}

export default observer(Input)
