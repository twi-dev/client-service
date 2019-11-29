import {shape, func, oneOfType, instanceOf} from "prop-types"
import {forwardRef as decorate, createElement} from "react"

const forwardRef = Target => {
  const ForwardRef = (props, forwardedRef) => (
    createElement(Target, {...props, forwardedRef})
  )

  return decorate(ForwardRef)
}

forwardRef.propTypes = {
  forwardedRef: oneOfType([
    func,
    shape({
      current: instanceOf(Element)
    })
  ])
}

forwardRef.defaultProps = {
  forwardedRef: undefined
}

export default forwardRef
