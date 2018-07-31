import {mutate} from "core/transport/graphql"

import getData from "core/helper/graphql/getData"

import addStoryMutation from "./addStory"

function addStory(story) {
  const options = {
    mutation: addStoryMutation,
    variables: {
      story
    }
  }

  return mutate(options).then(getData("addStory"))
}

export default addStory
