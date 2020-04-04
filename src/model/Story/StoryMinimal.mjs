import {types as t} from "mobx-state-tree"

import warn from "lib/helper/model/warnNotImplementedAction"

const schema = {
  title: t.optional(t.string, ""),
  description: t.optional(t.string, "")
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

const StoryMinimal = t.model("StoryMinimal", schema).actions(actions)

export default StoryMinimal
