import partial from "lodash/partial"

import save from "lib/auth/helper/saveTokens"
import getData from "lib/helper/graphql/getData"
import waterfall from "lib/helper/array/runWaterfall"

import {mutate} from "lib/transport/graphql"

import document from "./logIn.gql"

const read = getData("authLogIn")

function logIn(user) {
  const params = {
    mutation: document,
    variables: {
      user
    }
  }

  return waterfall([partial(mutate, params), read, save])
}

export default logIn
