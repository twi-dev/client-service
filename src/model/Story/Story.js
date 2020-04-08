import {types as t, flow} from "mobx-state-tree"

import update from "api/mutation/story/update"
import Slug from "model/Common/Slug"

import Base from "./StoryMinimal"

const schema = {
  id: t.identifier,
  slug: Slug,
  title: t.string,
  description: t.string,

  // TODO: Write a middleware to automate this case.
  // I need something that simply allows to manually update one value
  // and revert when needed
  initialTitle: t.optional(t.string, "")
}

const actions = self => ({
  updateTitle: flow(function* () {
    const story = yield update({id: self.id, title: self.title})

    self.title = story.title
  }),

  resetTitle() {
    self.title = self.initialTitle
  }
})

const views = () => ({
  get isNew() {
    return false
  }
})

const Story = Base.named("Story").props(schema).actions(actions).views(views)

export default Story
