import {string, bool} from "prop-types"
import {createElement} from "react"
import {observer} from "mobx-react"

import cn from "classnames"
import omit from "lodash/omit"

import Plain from "common/component/Input"

import {container} from "./input.scss"

const Input = ({className, ...props}) => (
  <div className={cn(container, className)}>
    <Plain {...(omit(props, "isValid", "warn"))} />
  </div>
)

Input.propTypes = {
  warn: string,
  isValid: bool,
  className: string
}

Input.defaultProps = {
  warn: string,
  isValid: false,
  className: undefined
}

export default observer(Input)
