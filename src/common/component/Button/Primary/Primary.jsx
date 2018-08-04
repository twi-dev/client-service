import React, {forwardRef} from "react"
import {oneOfType, arrayOf, string, element} from "prop-types"

import cn from "classnames"

import Button from "../Button"

import {container} from "./primary.sss"

const Primary = ({className, children, ...props}, ref) => (
  <Button {...{...props, ref}} className={cn(container, className)}>
    {children}
  </Button>
)

Primary.displayName = "PrimaryButton"

Primary.propTypes = {
  className: string,
  children: oneOfType([
    arrayOf(string), arrayOf(element),
    string, element
  ]).isRequired
}

Primary.defaultProps = {
  className: null
}

export default Primary |> forwardRef
