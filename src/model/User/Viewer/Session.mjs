import {types as t} from "mobx-state-tree"

import Viewer from "./Viewer"

const schema = {
  isSigned: t.boolean,
  viewer: t.maybeNull(Viewer)
}

const actions = self => {
  function setViewer(viewer) {
    self.isSigned = Boolean(viewer)
    self.viewer = viewer
  }

  const sign = viewer => setViewer(viewer)

  const unsign = () => setViewer(null)

  return {sign, unsign}
}

const before = viewer => ({viewer: viewer ?? null, isSigned: Boolean(viewer)})

const Session = t.model("Viewer", schema)
  .preProcessSnapshot(before)
  .actions(actions)

export default Session
