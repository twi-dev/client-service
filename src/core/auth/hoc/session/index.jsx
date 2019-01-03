import {createElement as h} from "react"

import provider from "core/model/provider"
import loadable from "core/hoc/loadable"
import db from "core/db/tokens"

import Loading from "core/component/Loading"

import refreshAccessToken from "core/auth/hoc/refreshAccessToken"
import Session from "core/auth/model/AuthTokens"

async function loadSession() {
  let [accessToken, refreshToken] = await Promise.all(
    ["accessToken", "refreshToken"].map(name => db.getItem(name))
  )

  accessToken || (accessToken = undefined)
  refreshToken || (refreshToken = undefined)

  if (!accessToken && !refreshToken) {
    return null
  }

  const session = Session.create({accessToken, refreshToken})

  if (session.isAccessExpired) {
    await session.refreshAccessToken()
  }

  return session
}

const LoadableSession = Target => loadable({
  name: "Session",
  delay: 300,
  loading: Loading,
  loaders: {
    session: loadSession,

    hoc: () => import("./session")
  },

  render: ({hoc, session}, props) => (
    h(hoc(Target |> refreshAccessToken |> provider({session})), props)
  )
})

export default LoadableSession
