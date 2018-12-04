import StoryLocal from "common/model/Story/StoryLocal"

const state = {
  story: () => StoryLocal.create({}),
}

export default state
