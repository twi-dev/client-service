import {createElement} from "react"

import getName from "core/helper/component/getName"

/**
 * @api private
 */
const attachConsumer = Consumer => Target => {
  const AttachConsumer = props => (
    <Consumer>
      {reporter => <Target {...{...props, reporter}} />}
    </Consumer>
  )

  AttachConsumer.displayName = `AttachConsumer(${getName(Target)})`

  return AttachConsumer
}

export default attachConsumer
