import {flow} from "mobx-state-tree"

import StoryMinimal from "../../../common/model/StoryMinimal"
import addStory from "../graphql/mutation/addStory"

const actions = self => ({
  submit: flow(function* submit() {
    const {title, description, chapters} = self

    return addStory({title, description, chapters})
  })
})

const StoryNew = StoryMinimal.named("StoryNew").actions(actions)

export default StoryNew
