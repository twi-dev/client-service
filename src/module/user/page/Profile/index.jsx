import loadPage from "core/hoc/loadPage"

import {query} from "core/transport/graphql"

import User from "common/model/store/user/User"

import getUser from "./user.gql"

const LoadablePage = loadPage({
  state: async ({match}) => {
    const login = match.params.login

    const res = await query({
      query: getUser,
      variables: {
        login
      }
    })

    const user = User.create(res.data.user)

    return {user}
  },

  component: () => import("./Profile")
})

export default LoadablePage
