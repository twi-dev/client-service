import {createElement} from "react"

import getName from "core/helper/component/getName"
import Portal from "core/component/Portal"

const portal = Target => {
  const CreatePortal = props => (
    createElement(Portal, null, createElement(Target, props))
  )

  CreatePortal.displayName = `CreatePortal(${getName(Target)})`

  return CreatePortal
}

export default portal
