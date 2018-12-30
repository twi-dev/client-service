import partial from "lodash/partial"

import getData from "core/helper/graphql/getData"
import waterfall from "core/helper/array/runWaterfall"

import {mutate} from "core/transport/graphql"

import document from "./logIn.gql"

const read = getData("authLogIn")

function logIn({credentials}) {
  const params = {
    mutation: document,
    variables: {
      credentials
    }
  }

  return waterfall([partial(mutate, params), read])
}

export default logIn
