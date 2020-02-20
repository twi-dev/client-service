import {types as t} from "mobx-state-tree"

import Viewer from "./Viewer"

const schema = {
  isSigned: t.boolean,
  viewer: t.maybeNull(Viewer)
}

const actions = self => ({
  setViewer(viewer) {
    self.isSigned = Boolean(viewer)
    self.viewer = viewer
  },

  sign(viewer) {
    self.setViewer(viewer)
  },

  unsign() {
    self.setViewer(null)
  }
})

const before = viewer => ({viewer: viewer ?? null, isSigned: Boolean(viewer)})

const Session = t.model("Viewer", schema)
  .preProcessSnapshot(before)
  .actions(actions)

export default Session
