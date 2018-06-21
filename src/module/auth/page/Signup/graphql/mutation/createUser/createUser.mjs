import {mutate} from "core/transport/graphql"

import getData from "core/helper/graphql/getData"

import createUserMutation from "./createUser.gql"

async function createUser(user) {
  const options = {
    mutation: createUserMutation,
    variables: {
      user
    }
  }

  return await mutate(options) |> getData("createUser")
}

export default createUser
