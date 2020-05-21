import {types} from "mobx-state-tree"

const {model, identifier, string} = types

const File = model("File", {
  id: identifier,
  path: string
})

export default File
