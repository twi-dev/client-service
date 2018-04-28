import loadPage from "core/hoc/loadPage"
import resolve from "core/helper/util/requireDefault"
import session from "core/auth/decorator/session"
import refresh from "core/auth/hoc/refreshAccessToken"

const LoadablePage = loadPage({
  @session state: () => ({}),

  component: async () => await import("./New") |> resolve |> refresh
})

export default LoadablePage
