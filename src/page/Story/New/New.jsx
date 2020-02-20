import {useLocalStore, observer} from "mobx-react-lite"
import {createElement} from "react"

import useTitle from "lib/hook/useTitle"

import Story from "model/Story//StoryNew"
import Input from "component/Input"

import {container, title} from "./new.css"

function StoryNew() {
  const story = useLocalStore(() => Story.create())

  useTitle(story.title || "Add a new story")

  return (
    <div className={container}>
      <Input
        type="text"
        className={title}
        value={story.title}
        onChange={story.updateTitleText}
        placeholder="Story title..."
      />
    </div>
  )
}

export default StoryNew |> observer
