import {types, flow} from "mobx-state-tree"

import update from "common/graphql/mutation/story/update"

import StoryMinimal from "./StoryMinimal"
import StorySlug from "./StorySlug"

const {identifier, string, optional} = types

const schema = {
  id: identifier,
  slug: StorySlug,
  title: string,
  description: string,

  initialTitle: optional(string, "")
}

const actions = self => ({
  updateTitle: flow(function* () {
    const story = yield update({id: self.id, title: self.title})

    self.title = story.title
  })
})

const views = () => ({
  get isLocal() {
    return false
  }
})

const Story = StoryMinimal.named("Story")
  .props(schema)
  .actions(actions)
  .views(views)

export default Story
