import partial from "lodash/partial"

import getData from "core/helper/graphql/getData"
import waterfall from "core/helper/array/runWaterfall"

import {query} from "core/transport/graphql"

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
