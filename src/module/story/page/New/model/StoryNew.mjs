import {flow} from "mobx-state-tree"

import isEmpty from "lodash/isEmpty"

import StoryMinimal from "../../../common/model/StoryMinimal"
import addStory from "../graphql/mutation/addStory"

const actions = self => ({
  submit: flow(function* submit() {
    // TODO: This mutation needs some changes on the server
    //   1. I need to make chapters optional
    //   2. Also, a story without any chapters will be forced as draft.
    const {title, description, chapters, characters, genres} = self

    let isDraft = self.isDraft

    // A story without any chapters is always a draft.
    if (isEmpty(chapters)) {
      isDraft = true
    }

    return addStory({title, description, chapters, characters, genres, isDraft})
  })
})

// const views = self => ({})

const before = ({title, description, ...snapshot}) => ({
  ...snapshot, title: title || "", description: description || ""
})

const StoryNew = StoryMinimal.named("StoryNew")
  .actions(actions).preProcessSnapshot(before)

export default StoryNew
