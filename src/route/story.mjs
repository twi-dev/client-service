import NewStory from "module/story/page/New"
import Story from "module/story/page/Details"

const story = [
  {
    path: "/new",
    component: NewStory
  },
  {
    path: "/:slug",
    component: Story
  }
]

export default story
