import {node, string, number, oneOfType} from "prop-types"
import {useState} from "react"

import ms from "ms"
import isNumber from "lodash/isNumber"
import useEffectOnce from "react-use/lib/useEffectOnce"

function Delay({children, amount}) {
  const [passed, update] = useState(false)

  useEffectOnce(() => {
    let timer = null
    if (amount) {
      timer = setTimeout(
        () => update(true),

        isNumber(amount) ? amount : ms(amount)
      )
    }

    return () => timer && clearTimeout(timer)
  })

  return passed ? children : null
}

Delay.propTypes = {
  children: node.isRequired,
  amount: oneOfType([string, number])
}

Delay.defaultProps = {
  amount: 300
}

export default Delay
