import {node, string, number, oneOfType} from "prop-types"
import {useState} from "react"

import useUnmount from "react-use/lib/useUnmount"
import useMount from "react-use/lib/useMount"
import isNumber from "lodash/isNumber"
import ms from "ms"

function Delay({children, amount}) {
  const [passed, update] = useState(false)

  let timer = null

  useMount(() => {
    if (amount) {
      timer = setTimeout(
        () => update(true),

        isNumber(amount) ? amount : ms(amount)
      )
    }
  })

  useUnmount(() => timer && clearTimeout(timer))

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
