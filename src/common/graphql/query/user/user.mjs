import partial from "lodash/partial"

import getData from "core/helper/graphql/getData"
import waterfall from "core/helper/array/runWaterfall"

import {query} from "core/transport/graphql"

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
