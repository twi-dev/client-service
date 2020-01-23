import {lazy} from "react"

const id = import.meta.url

const story = [
  {
    id,
    path: "/new",
    page: {
      component: lazy(() => import("page/Story/New"))
    }
  },
  // {
  //   path: "/:slug",
  //   page: {
  //     component: Story
  //   }
  // }
]

export default story
