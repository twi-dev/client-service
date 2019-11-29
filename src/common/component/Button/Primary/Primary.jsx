import {shape, string, node} from "prop-types"
import {createElement} from "react"

import cn from "classnames"

import forwardRef from "lib/hoc/forwardRef"

import Plain from "common/component/Button"

import {container} from "./primary.scss"

const Primary = ({className, children, forwardedRef, ...props}) => (
  <Plain {...props} className={cn(container, className)} ref={forwardedRef}>
    {children}
  </Plain>
)

Primary.displayName = "PrimaryButton"

Primary.propTypes = {
  ...forwardRef.propTypes,

  className: string,
  forwardedRef: shape({}),
  children: node.isRequired,
}

Primary.defaultProps = {
  ...forwardRef.defaultProps,

  className: null
}

export default Primary |> forwardRef
