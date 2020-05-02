import {node, string, number, oneOfType} from "prop-types"
import {useState} from "react"

import ms from "ms"
import isNumber from "lodash/isNumber"
import useEffectOnce from "react-use/lib/useEffectOnce"

/**
 * Renders a children component once the given amount of time passes
 */
function Delay({children, amount}) {
  const [passed, update] = useState(false)

  useEffectOnce(() => {
    let timer = null
    if (amount != null) {
      timer = setTimeout(
        () => update(true),

        isNumber(amount) ? Math.abs(amount) : ms(amount)
      )
    } else {
      update(true)
    }

    return () => timer && clearTimeout(timer)
  })

  return passed ? children : null
}

Delay.propTypes = {
  fallback: node,
  children: node.isRequired,
  amount: oneOfType([string, number])
}

Delay.defaultProps = {
  fallback: null,
  amount: 300
}

export default Delay
