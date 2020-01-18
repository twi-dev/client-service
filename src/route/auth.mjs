import {lazy} from "react"

const auth = [
  {
    path: "/signup",
    page: {
      layout: false,
      component: lazy(() => import("page/Auth/Signup"))
    },
  },
  {
    path: "/login",
    page: {
      layout: false,
      component: lazy(() => import("page/Auth/Login"))
    }
  },
  {
    path: "/confirm/:hash",
    page: {
      layout: false,
      component: lazy(() => import("page/Auth/Confirm"))
    }
  }
]

export default auth
