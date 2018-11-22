import {createElement as h} from "react"

import loadingProcess from "core/hoc/loadingProcess"
import loadable from "core/hoc/loadable"
import connect from "core/model/connect"
import db from "core/db/tokens"

import Loading from "core/component/Loading"
import ApplicationError from "core/component/Error/ApplicationError"

import Session from "../../model/AuthTokenPayload"
import refreshAccessToken from "../refreshAccessToken"

const LoadingProcess = loadingProcess({
  onLoading: Loading,
  onError: ApplicationError
})

async function loadSession() {
  const [accessToken, refreshToken] = await Promise.all(
    ["accessToken", "refreshToken"].map(name => db.getItem(name))
  )

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
  loading: LoadingProcess,
  loaders: {
    session: loadSession,

    hoc: () => import("./session")
  },

  render: ({hoc, session}, props) => (
    h(hoc(Target |> refreshAccessToken |> connect({session})), props)
  )
})

export default LoadableSession
