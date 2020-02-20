import {types as t} from "mobx-state-tree"

import Viewer from "./Viewer"

const schema = {
  isSigned: t.boolean,
  viewer: t.maybeNull(Viewer)
}

const before = viewer => ({viewer: viewer ?? null, isSigned: Boolean(viewer)})

const Session = t.model("Viewer", schema).preProcessSnapshot(before)

export default Session
