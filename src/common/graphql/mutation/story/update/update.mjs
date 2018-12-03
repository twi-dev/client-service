import partial from "lodash/partial"

import getData from "core/helper/graphql/getData"
import waterfall from "core/helper/array/runWaterfall"

import client from "core/transport/graphql"

import document from "./update.gql"

const read = getData("updateStory")

function updateStory(variables) {
  const params = {
    mutation: document,
    variables
  }

  return waterfall([partial(client.mutate, params), read])
}

export default updateStory
