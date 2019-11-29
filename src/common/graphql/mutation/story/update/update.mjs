import partial from "lodash/partial"

import getData from "lib/helper/graphql/getData"
import waterfall from "lib/helper/array/runWaterfall"

import client from "lib/transport/graphql"

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
