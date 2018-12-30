import getTime from "date-fns/getTime"

import db from "core/db/tokens"

/**
 * Check if viewer have the authentication credentionals
 *
 * @return {boolean}
 */
async function isAuthenticated() {
  const now = Date.now()

  const refreshToken = await db.getItem("refreshToken")

  // Non-existent refreshToken means that user is not authenticated.
  if (!(refreshToken && refreshToken.payload)) {
    return false
  }

  const accessToken = await db.getItem("accessToken")

  // Non-existent accessToken means bad authentication status too.
  if (!(accessToken && accessToken.payload)) {
    return false
  }

  const expires = getTime(accessToken.expires)

  // accessToken must be actual, unless it will not be passed on the server.
  // So, check the espiration status.
  return Boolean(now < expires)
}

export default isAuthenticated
