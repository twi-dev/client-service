import partial from "lodash/partial"

import db from "lib/db/tokens"
import getData from "lib/helper/graphql/getData"
import waterfall from "lib/helper/array/runWaterfall"
import save from "lib/auth/helper/saveTokens"

import {mutate} from "lib/transport/graphql"

import document from "./confirm.gql"

const read = getData("authLogIn")

async function confirm(hash) {
  const token = db.getItem("refreshToken")

  const params = {
    mutation: document,
    variables: {
      hash,

      token: token ? token.payload : null
    }
  }

  let result = false

  try {
    await waterfall([partial(mutate, params), read, save])

    result = true
  } catch (err) {
    if (err.networkError) {
      throw err
    }
  }

  return result
}

export default confirm
