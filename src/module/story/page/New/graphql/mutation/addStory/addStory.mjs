import {mutate} from "core/transport/graphql"

import getData from "core/helper/graphql/getData"

import addStoryMutation from "./addStory"

async function addStory(story) {
  const options = {
    mutation: addStoryMutation,
    variables: {
      story
    }
  }

  return await mutate(options) |> getData("addStory")
}

export default addStory
