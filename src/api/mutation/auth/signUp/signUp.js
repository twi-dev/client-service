import partial from "lodash/partial"

import save from "lib/auth/helper/saveTokens"
import getData from "lib/helper/graphql/getData"
import waterfall from "lib/helper/array/runWaterfall"

import {mutate} from "lib/transport/graphql"

import document from "./signUp.gql"

const read = getData("authSignUp")

function signUp({user}) {
  const params = {
    mutation: document,
    variables: {
      user
    }
  }

  return waterfall([partial(mutate, params), read, save])
}

export default signUp
