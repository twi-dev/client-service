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

    if (!isSigned) {
      return "/"
    }
  }
})

const action = partial(waterfall, [resolve, redirect, toDefault])

const story = [
  {
    path: "/new",
    page: {
      component: lazy(() => import("page/Story/New") |> action)
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
