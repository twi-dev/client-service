import React from "react"

import getName from "core/helper/component/getName"

import Context from "./Context"

/**
 * @api private
 */
const createApplicaitonErrorConsumer = Target => {
  const ApplicaitonErrorConsumer = props => (
    <Context.Consumer>
      {report => <Target {...{...props}} applicationError={{report}} />}
    </Context.Consumer>
  )

  const name = getName(Target)

  ApplicaitonErrorConsumer.displayName = `ApplicaitonErrorConsumer(${name})`

  return ApplicaitonErrorConsumer
}

export default createApplicaitonErrorConsumer
