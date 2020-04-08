import partial from "lodash/partial"

import getData from "lib/helper/graphql/getData"
import waterfall from "lib/helper/array/runWaterfall"
import save from "lib/auth/helper/saveTokens"

import {mutate} from "lib/transport/graphql"

import document from "./confirm.gql"

const read = getData("authConfirmEmail")

async function confirm(hash) {
  const params = {
    mutation: document,
    variables: {
      hash
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
