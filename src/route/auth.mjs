import {lazy} from "react"

const auth = [
  {
    path: "/signup",
    page: {
      component: lazy(() => import("page/Auth/Signup")),
      layout: false
    },
  },
  {
    path: "/login",
    page: {
      layout: false,
      component: lazy(() => import("page/Auth/Login"))
    },
  }
]

export default auth
