import partial from "lodash/partial"

import getData from "lib/helper/graphql/getData"
import waterfall from "lib/helper/array/runWaterfall"

import {mutate} from "lib/transport/graphql"

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
