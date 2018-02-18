import {types} from "mobx-state-tree"

import {schema as user} from "common/model/store/user/User"

const {model, string} = types

const schema = {
  ...user,
  email: string
}

const Viewer = model("Viewer", schema)

export {schema}
export default Viewer
