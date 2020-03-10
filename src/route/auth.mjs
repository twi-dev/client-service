import {lazy, useContext} from "react"

import partial from "lodash/partial"

import redirect from "lib/hoc/redirect"
import waterfall from "lib/helper/array/runWaterfall"
import toDefault from "lib/helper/util/interopRequireDefault"
import resolve from "lib/helper/util/requireDefault"

import Context from "model/User/Viewer/Context"

const withRedirect = redirect({
  getUrl() {
    const {isSigned} = useContext(Context)

    if (isSigned) {
      return "/"
    }
  }
})

const action = partial(waterfall, [resolve, withRedirect, toDefault])

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
    path: "/confirm/:hash",
    page: {
      layout: false,
      component: lazy(() => import("page/Auth/Confirm") |> action)
    }
  }
]

export default auth
