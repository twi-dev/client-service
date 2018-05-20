import loadablePage from "core/hoc/loadable/page"
import resolve from "core/helper/util/requireDefault"
import session from "core/auth/decorator/session"
import refresh from "core/auth/hoc/refreshAccessToken"

import viewer from "common/hoc/viewer"

const LoadablePage = loadablePage({
  loaders: {
    @session session: () => ({}),

    Component: async () => (
      await import("./Feed") |> resolve |> viewer |> refresh
    )
  }
})

export default LoadablePage
