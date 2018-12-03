import {types} from "mobx-state-tree"

const {model, maybe, string} = types

const schema = {
  title: string,
  description: maybe(string)
}

const actions = self => ({
  updateTextField: updateTextField(self),

  resetTitle: () => void (self.title = "")
})

const StoryMinimal = model("StoryMinimal", schema).actions(actions)

export default StoryMinimal
