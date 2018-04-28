import {types} from "mobx-state-tree"

const {model, identifier, string} = types

// TODO:
// Move to common scope of this module (story)
// and rename to StoryMinimal.
const schema = {
  id: identifier(),
  title: string
}

const Story = model("Story", schema)

export default Story
