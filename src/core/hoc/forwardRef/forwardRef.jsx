import {forwardRef as decorate, createElement} from "react"
import {shape} from "prop-types"

const forwardRef = Target => {
  const ForwardRef = (props, forwardedRef) => (
    createElement(Target, {...props, forwardedRef})
  )

  return decorate(ForwardRef)
}

forwardRef.propTypes = {
  forwardedRef: shape({})
}

forwardRef.defaultProps = {
  forwardedRef: undefined
}

export default forwardRef
