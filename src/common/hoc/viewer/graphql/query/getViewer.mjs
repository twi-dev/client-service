import {query} from "core/transport/graphql"

import getData from "core/helper/graphql/getData"
import isAuthenticated from "core/auth/helper/isAuthenticated"

import viewerQuery from "./getViewer.gql"

const getViewer = async () => {
  if (!(await isAuthenticated())) {
    return null
  }

  const options = {
    query: viewerQuery
  }

  return await query(options) |> getData("viewer")
}

export default getViewer
