import partial from "lodash/partial"

import waterfall from "core/helper/array/runWaterfall"
import create from "core/model/create"

import Story from "./model/Story"
import query from "./graphql/query/story"

const state = {
  story: ({match}) => waterfall([partial(query, match.params), create(Story)])
}

export default state
