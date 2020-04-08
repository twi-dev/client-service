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
  get isNew() {
    return true
  }
})

const StoryNew = StoryMinimal.named("StoryNew")
  .actions(actions)
  .views(views)

export default StoryNew
