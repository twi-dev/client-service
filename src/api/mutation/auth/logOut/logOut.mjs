import {mutate} from "lib/transport/graphql"

import db from "lib/db/tokens"

import document from "./logOut.gql"

const names = ["accessToken", "refreshToken"]

async function logOut() {
  const token = await db.getItem("refreshToken")

  if (!token) {
    throw new Error("Can't find a refreshToken.")
  }

  const params = {
    mutation: document,
    variables: {
      token: token.payload
    }
  }

  await mutate(params).then(() => names.map(name => db.removeItem(name)))
}

export default logOut
