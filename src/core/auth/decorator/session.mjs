import db from "core/db/tokens"

import AuthTokenPayload from "../model/AuthTokenPayload"

const assign = Object.assign

// TODO: Move to a HOC
const setSession = (target, key, descriptor) => {
  const initializer = descriptor.initializer

  descriptor.initializer = () => async function sessionDecorator(...args) {
    const [accessToken, refreshToken] = await Promise.all(
      ["accessToken", "refreshToken"].map(name => db.getItem(name))
    )

    if (!accessToken || !refreshToken) {
      const state = await initializer().apply(this, args)

      return assign({}, state, {session: null})
    }

    const session = AuthTokenPayload.create({accessToken, refreshToken})

    if (session.isAccessExpired && session.refreshToken) {
      await session.refreshAccessToken()
    }

    const state = await initializer().apply(this, args)

    return assign({}, state, session)
  }

  return descriptor
}

export default setSession
