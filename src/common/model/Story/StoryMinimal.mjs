import {types} from "mobx-state-tree"

import warn from "core/helper/model/warnNotImplementedAction"

const {model, optional, string} = types

const schema = {
  title: optional(string, ""),
  description: optional(string, "")
}

const actions = self => ({
  updateTitleText: warn(self),

  updateTitle: warn.flow(self),

  resetTitle: warn(self)
})

const StoryMinimal = model("StoryMinimal", schema).actions(actions)

export default StoryMinimal
