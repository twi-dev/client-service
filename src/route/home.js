import {lazy} from "react"

const home = [
  {
    id: import.meta.url,
    path: "/",
    page: {
      component: lazy(() => import("page/Home"))
    }
  }
]

export default home
