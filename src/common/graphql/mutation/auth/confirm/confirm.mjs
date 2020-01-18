import partial from "lodash/partial"

import getData from "lib/helper/graphql/getData"
import waterfall from "lib/helper/array/runWaterfall"

import {mutate} from "lib/transport/graphql"

import document from "./confirm.gql"

const read = getData("authLogIn")

async function confirm(hash) {
  const params = {
    mutation: document,
    variables: {
      hash
    }
  }

  let result = false

  try {
    result = await waterfall([partial(mutate, params), read])
  } catch (err) {
    if (err.networkError) {
      throw err
    }

    result = false
  }

  return result
}

export default confirm
