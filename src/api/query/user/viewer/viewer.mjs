import {query} from "lib/transport/graphql"

import db from "lib/db/tokens"
import getData from "lib/helper/graphql/getData"

import document from "./viewer.gql"

const read = getData("viewer")

async function getViewer() {
  const token = await db.getItem("accessToken")

  // User is not authenticated
  if (!token) {
    return null
  }

  return query({query: document}).then(read)
}

export default getViewer
