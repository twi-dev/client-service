import {query} from "core/transport/graphql"

import getData from "core/helper/graphql/getData"
import isAuthenticated from "core/auth/helper/isAuthenticated"

import getViewerQuery from "./getViewer.gql"

const getViewer = async () => {
  if (!(await isAuthenticated())) {
    return null
  }

  const res = await query({query: getViewerQuery})

  return res |> getData("viewer")
}

export default getViewer
