import {query} from "core/transport/graphql"

import story from "./story.gql"

async function getStory(slug) {
  const res = await query({
    query: story,
    variables: {
      slug
    }
  })

  return res.data.story
}

export default getStory
