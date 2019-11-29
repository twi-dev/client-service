import partial from "lodash/partial"

import getData from "lib/helper/graphql/getData"
import waterfall from "lib/helper/array/runWaterfall"

import {query} from "lib/transport/graphql"

import document from "./story.gql"

function story({slug}) {
  const params = {
    query: document,
    variables: {
      slug
    }
  }

  return waterfall([partial(query, params), getData("story")])
}

export default story
