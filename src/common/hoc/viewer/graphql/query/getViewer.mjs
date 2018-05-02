import {query} from "core/transport/graphql"

import getData from "core/helper/graphql/getData"

import getViewerQuery from "./getViewer.gql"

const getViewer = async () => (
  await query({query: getViewerQuery}) |> getData("viewer")
)

export default getViewer
