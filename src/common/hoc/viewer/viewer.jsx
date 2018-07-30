import {createElement as h} from "react"

import getName from "core/helper/component/getName"

const viewer = Target => {
  const Viewer = props => h(Target, props)

  Viewer.displayName = `Viewer(${(getName(Target))})`

  return Viewer
}

export default viewer
