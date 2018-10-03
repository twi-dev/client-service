import React from "react"
import cn from "classnames"
import omit from "lodash/omit"

import {observer} from "mobx-react"
import {PropTypes as types, boolean} from "prop-types"

import Plain from "common/component/Input"

import {container} from "./input.scss"

const Input = ({className, ...props}) => (
  <div className={cn(container, className)}>
    <Plain {...(omit(props, "isValid", "warn"))} />
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
