import User from "common/model/store/user/User"
import create from "core/model/create"

import getUser from "./graphql/query/user"

const state = {
  user: ({match}) => getUser(match.params.login).then(create(User))
}

export default state
