import partial from "lodash/partial"

import getData from "core/helper/graphql/getData"
import waterfall from "core/helper/array/runWaterfall"

import {mutate} from "core/transport/graphql"

import document from "./signUp.gql"

const read = getData("authSignUp")

function signUp({user}) {
  const params = {
    mutation: document,
    variables: {
      user
    }
  }

  return waterfall([partial(mutate, params), read])
}

export default signUp
