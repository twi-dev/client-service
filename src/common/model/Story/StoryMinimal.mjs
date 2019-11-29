import {types} from "mobx-state-tree"

import warn from "lib/helper/model/warnNotImplementedAction"

const {model, optional, string} = types

const schema = {
  title: optional(string, ""),
  description: optional(string, "")
}

const actions = self => ({
  updateTitleText({target}) {
    self.title = target.value
  },

  updateDescriptionText({target}) {
    self.title = target.value
  },

  updateTitle: warn.flow(self),

  resetTitle: warn(self)
})

const StoryMinimal = model("StoryMinimal", schema).actions(actions)

export default StoryMinimal
