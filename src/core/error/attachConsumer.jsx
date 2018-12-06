import React from "react"

const attachConsumer = Consumer => Target => {
  const AttachConsumer = props => (
    <Consumer>
      {reporter => <Target {...{...props, reporter}} />}
    </Consumer>
  )

  return AttachConsumer
}

export default attachConsumer
