import partial from "lodash/partial"

import db from "lib/db/tokens"
import getData from "lib/helper/graphql/getData"
import waterfall from "lib/helper/array/runWaterfall"
import save from "lib/auth/helper/saveTokens"

import {mutate} from "lib/transport/graphql"

import document from "./confirm.gql"

const read = getData("authConfirmPasswordReset")

async function confirm({password, hash}) {
  const token = db.getItem("refreshToken")

  const params = {
    mutation: document,
    variables: {
      confirm: {
        password, hash, token: token ? token.payload : null
      },
    }
  }

  await waterfall([partial(mutate, params), read, save])
}

export default confirm
