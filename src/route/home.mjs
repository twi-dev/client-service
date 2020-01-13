import {lazy} from "react"

const home = [
  {
    path: "/",
    page: {
      layout: false,
      component: lazy(() => import("page/Home"))
    }
  }
]

export default home
