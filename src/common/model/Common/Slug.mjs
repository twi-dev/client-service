import {types} from "mobx-state-tree"

const {model, frozen, string} = types

const schema = {
  full: frozen(string),
  short: frozen(string)
}

const Slug = model("Slug", schema)

export default Slug
