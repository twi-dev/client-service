import {mutate} from "core/transport/graphql"

import getData from "core/helper/graphql/getData"

import authenticateMutation from "./authenticate.gql"

async function authenticate(credentials) {
  const options = {
    mutation: authenticateMutation,
    variables: {
      credentials
    }
  }

  return await mutate(options) |> getData("suthenticate")
}

export default authenticate
