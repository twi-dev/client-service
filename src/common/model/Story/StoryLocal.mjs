import StoryMinimal from "./StoryMinimal"

const actions = self => ({
  updateTitleText({target}) {
    self.title = target.value
  },

  resetTitle() {
    self.title = ""
  }
})

const views = () => ({
  get isLocal() {
    return true
  }
})

const StoryLocal = StoryMinimal.named("StoryLocal")
  .actions(actions)
  .views(views)

export default StoryLocal
