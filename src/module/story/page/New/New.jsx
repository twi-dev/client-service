import {createElement, Fragment} from "react"

import Title from "common/component/Title"

import Editor from "../../common/component/Editor"

const NewStory = () => (
  <Fragment>
    <Title title="Add a new story" />

    <Editor />
  </Fragment>
)

export default NewStory
