import {query} from "lib/transport/graphql"

import getData from "lib/helper/graphql/getData"
import isAuthenticated from "lib/auth/helper/isAuthenticated"

import document from "./getViewer.gql"

const getViewer = async () => {
  if (!(await isAuthenticated())) {
    return null
  }

  const options = {
    query: document
  }

  return query(options).then(getData("viewer"))
}

export default getViewer
