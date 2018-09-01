import {createElement as h} from "react"

import getName from "core/helper/component/getName"

const session = Target => {
  const Session = props => h(Target, props)

  Session.displayName = `SessionProvider(${getName(Target)})`

  return Session
}

export default session
