import {types, flow} from "mobx-state-tree"

import update from "common/graphql/mutation/story/update"
import Slug from "common/model/Common/Slug"

import Base from "./StoryMinimal"

const {identifier, string, optional} = types

const schema = {
  id: identifier,
  slug: Slug,
  title: string,
  description: string,

  // TODO: Write a middleware to automate this case.
  // I need something that simply allows to manually update one value
  // and revert when needed
  initialTitle: optional(string, "")
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
