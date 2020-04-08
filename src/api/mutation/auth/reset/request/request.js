import getData from "lib/helper/graphql/getData"

import {mutate} from "lib/transport/graphql"

import document from "./request.gql"

const read = getData("authRequestPasswordReset")

async function request(email) {
  const params = {
    mutation: document,
    variables: {
      email
    }
  }

  return mutate(params).then(read)
}

export default request
