import {types} from "mobx-state-tree"

import StorySlug from "./StorySlug"

const {model, identifier} = types

const schema = {
  id: identifier,
  slug: StorySlug
}

const Story = model("Story", schema)

export default Story
