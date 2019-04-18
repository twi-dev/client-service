import {forwardRef as decorator, createElement as h} from "react"

const forwardRef = Target => {
  const ForwardRef = (props, forwardedRef) => (
    h(Target, {...props, forwardedRef})
  )

  return ForwardRef |> decorator
}

export default forwardRef
