import db from "core/db"

async function isTokenExpired() {
  const token = await db.getItem("accessToken")

  const now = new Date()
  const expires = new Date(token.expires)

  return now.getTime() >= expires.getTime()
}

export default isTokenExpired
