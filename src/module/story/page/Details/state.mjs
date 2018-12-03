import partial from "lodash/partial"

import waterfall from "core/helper/array/runWaterfall"
import create from "core/model/create"

import query from "common/graphql/query/story"
import Story from "common/model/Story"

const state = {
  story: ({match}) => waterfall([partial(query, match.params), create(Story)])
}

export default state
