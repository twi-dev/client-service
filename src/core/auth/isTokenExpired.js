import db from "core/db/tokens"

async function isTokenExpired() {
  const token = await db.getItem("accessToken")

  if (!token) {
    return true
  }

  const now = new Date()
  const expires = new Date(token.expires)

  return now.getTime() >= expires.getTime()
}

export default isTokenExpired
