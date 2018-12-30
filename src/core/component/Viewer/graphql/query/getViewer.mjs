import {query} from "core/transport/graphql"

import getData from "core/helper/graphql/getData"
import isAuthenticated from "core/auth/helper/isAuthenticated"

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
