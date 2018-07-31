import {query} from "core/transport/graphql"

import getData from "core/helper/graphql/getData"

import storyQuery from "./story.gql"

function story(slug) {
  const options = {
    query: storyQuery,
    variables: {
      slug
    }
  }

  return query(options).then(getData("story"))
}

export default story
