import create from "core/model/create"

import Story from "./model/Story"
import getStory from "./graphql/query/getStory"

const state = {
  story: ({match}) => getStory(match.params.slug).then(create(Story)),
}

export default state
