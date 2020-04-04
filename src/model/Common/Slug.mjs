import {types as t} from "mobx-state-tree"

const Slug = t.model("Slug", {
  full: t.frozen(t.string),
  short: t.frozen(t.string)
})

export default Slug
