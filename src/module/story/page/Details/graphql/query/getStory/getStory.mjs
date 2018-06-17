import {query} from "core/transport/graphql"

import getData from "core/helper/graphql/getData"

import storyQuery from "./story.gql"

async function getStory(slug) {
  const options = {
    query: storyQuery,
    variables: {
      slug
    }
  }

  return await query(options) |> getData("story")
}

export default getStory
