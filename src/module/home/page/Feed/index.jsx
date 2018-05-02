import loadPage from "core/hoc/loadPage"
import resolve from "core/helper/util/requireDefault"
import session from "core/auth/decorator/session"
import refresh from "core/auth/hoc/refreshAccessToken"

import viewer from "common/hoc/viewer"

const LoadablePage = loadPage({
  @session state: () => ({}),

  component: async () => (
    await import("./Feed") |> resolve |> refresh |> viewer
  )
})

export default LoadablePage
