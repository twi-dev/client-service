import {createElement} from "react"

import getName from "lib/helper/component/getName"

const session = Target => {
  const Session = props => createElement(Target, props)

  Session.displayName = `SessionProvider(${getName(Target)})`

  return Session
}

export default session
