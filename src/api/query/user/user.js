import partial from "lodash/partial"

import getData from "lib/helper/graphql/getData"
import waterfall from "lib/helper/array/runWaterfall"

import {query} from "lib/transport/graphql"

import document from "./user.gql"

const read = getData("user")

function user({login}) {
  const params = {
    query: document,
    variables: {
      login
    }
  }

  return waterfall([partial(query, params), read])
}

export default user
