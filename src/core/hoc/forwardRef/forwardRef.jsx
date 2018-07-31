import {forwardRef as fwd, createElement as h} from "react"

const forwardRef = Target => {
  const ForwardRef = (props, forwardedRef) => (
    h(Target, {...props, forwardedRef})
  )

  return ForwardRef |> fwd
}

export default forwardRef
