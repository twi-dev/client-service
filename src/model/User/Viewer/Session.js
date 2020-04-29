import {types as t} from "mobx-state-tree"

import Viewer from "./Viewer"

const Session = t.model("Viewer", {viewer: t.maybeNull(Viewer)})
  .preProcessSnapshot(viewer => ({viewer: viewer ?? null}))
  .actions(self => {
    /**
     * @param {Viewer} viewer
     *
     * @private
     */
    function setViewer(viewer) {
      self.viewer = viewer
    }

    /**
     * @param {Viewer} viewer
     */
    const sign = viewer => setViewer(viewer)

    const unsign = () => setViewer(null)

    return {sign, unsign}
  })
  .views(self => ({
    get isSigned() {
      return !!self.viewer
    }
  }))

export default Session
