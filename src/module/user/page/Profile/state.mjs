import partial from "lodash/partial"

import waterfall from "core/helper/array/runWaterfall"
import create from "core/model/create"
import User from "common/model/User"

import query from "common/graphql/query/user"

const state = {
  user: ({match}) => waterfall([partial(query, match.params), create(User)])
}

export default state
