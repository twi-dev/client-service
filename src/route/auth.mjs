import {lazy} from "react"

const auth = [
  // {
  //   path: "/signup",
  //   page: {
  //     component: Signup,
  //     layout: false
  //   },
  // },
  {
    path: "/login",
    page: {
      layout: false,
      component: lazy(() => import("page/Auth/LogIn"))
    },
  }
]

export default auth
