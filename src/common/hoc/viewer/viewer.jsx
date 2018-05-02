import {h} from "preact"

const viewer = Target => {
  const name = Target.displayName || Target.name || "Unknown"

  const Viewer = props => h(Target, props)

  Viewer.displayName = `Viewer(${name})`

  return Viewer
}

export default viewer
