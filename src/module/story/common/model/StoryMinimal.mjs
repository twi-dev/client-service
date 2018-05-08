import {types} from "mobx-state-tree"

import updateTextField from "common/model/action/updateTextField"

const {model, maybe, string} = types

const schema = {
  title: string,
  description: maybe(string)
}

const actions = self => ({
  updateTextField: updateTextField(self)
})

const StoryMinimal = model("StoryMinimal", schema).actions(actions)

export default StoryMinimal
