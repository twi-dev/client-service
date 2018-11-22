import partial from "lodash/partial"

import waterfall from "core/helper/array/runWaterfall"
import User from "common/model/store/user/User"
import create from "core/model/create"

import query from "./graphql/query/user"

const state = {
  user: ({match}) => waterfall([partial(query, match.params), create(User)])
}

export default state
