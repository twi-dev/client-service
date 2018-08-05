import {forwardRef as decorate, createElement as h} from "react"

const forwardRef = Target => {
  const ForwardRef = (props, forwardedRef) => (
    h(Target, {...props, forwardedRef})
  )

  return ForwardRef |> decorate
}

export default forwardRef
