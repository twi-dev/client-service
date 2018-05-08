import {types} from "mobx-state-tree"

import CommonDates from "common/model/store/misc/CommonDates"

import StoryMinimal from "../../../common/model/StoryMinimal"

const {identifier, string} = types

const schema = {
  id: identifier(),
  dates: CommonDates,

  // Maybe I need to make links contain also a story title?
  slug: string
}

const Story = StoryMinimal.named("Story").props(schema)

export default Story
