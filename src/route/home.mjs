import {lazy} from "react"

const home = [
  {
    path: "/",
    page: {
      component: lazy(() => import("page/Home"))
    }
  }
]

export default home
