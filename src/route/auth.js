import {lazy, useContext} from "react"

import partial from "lodash/partial"

import createRedirect from "lib/hoc/redirect"
import waterfall from "lib/helper/array/runWaterfall"
import toDefault from "lib/helper/util/interopRequireDefault"
import resolve from "lib/helper/util/requireDefault"

import Session from "model/User/Viewer/Context"

const redirect = createRedirect({
  getUrl() {
    const {isSigned} = useContext(Session)

    if (isSigned) {
      return "/"
    }
  }
})

const action = partial(waterfall, [resolve, redirect, toDefault])

const auth = [
  {
    path: "/signup",
    page: {
      layout: false,
      component: lazy(() => import("page/Auth/Signup") |> action)
    },
  },
  {
    path: "/login",
    page: {
      layout: false,
      component: lazy(() => import("page/Auth/Login") |> action)
    }
  },
  {
    path: "/reset",
    page: {
      layout: false,
      component: lazy(() => import("page/Auth/Reset/Request") |> action)
    }
  },
  {
    path: "/reset/:hash",
    page: {
      layout: false,
      component: lazy(() => import("page/Auth/Reset/Confirm") |> action)
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
