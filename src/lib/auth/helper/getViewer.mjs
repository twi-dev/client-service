import gql from "graphql-tag"

import {query} from "lib/transport/graphql"

import db from "lib/db/tokens"
import getData from "lib/helper/graphql/getData"

// FIXME: Probably I want to move it to a precompiled file instead
const document = gql`
  query GetViewer {
    viewer {
      id
      email
      login
      status
      role

      dates {
        registeredAt
      }
    }
  }
`

async function getViewer() {
  const token = await db.getItem("accessToken")

  // User is not authenticated
  if (!token) {
    return null
  }

  return query({query: document}).then(getData("viewer"))
}

export default getViewer
