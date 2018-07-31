import {mutate} from "core/transport/graphql"

import getData from "core/helper/graphql/getData"

import createUserMutation from "./createUser.gql"

function createUser(user) {
  const options = {
    mutation: createUserMutation,
    variables: {
      user
    }
  }

  return mutate(options).then(getData("createUser"))
}

export default createUser
