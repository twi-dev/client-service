import {useLocalStore, observer} from "mobx-react-lite"
import {createElement} from "react"

import useTitle from "lib/hook/useTitle"

import Story from "common/model/Story//StoryNew"

function StoryNew() {
  const story = useLocalStore(() => Story.create())

  useTitle(story.title || "Add a new story")

  return (
    <div>
      <input
        type="text"
        value={story.title}
        onChange={story.updateTitleText}
      />
    </div>
  )
}

export default StoryNew |> observer
