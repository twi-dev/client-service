import {createElement} from "react"

import Portal from "lib/component/Portal"
import getName from "lib/helper/component/getName"

const portal = Target => {
  const CreatePortal = props => (
    createElement(Portal, null, createElement(Target, props))
  )

  CreatePortal.displayName = `CreatePortal(${getName(Target)})`

  return CreatePortal
}

export default portal
