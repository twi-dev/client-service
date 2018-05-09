import {h} from "preact"
import {shape} from "prop-types"

import Fragment from "common/component/Fragment"
import Title from "common/component/Title"

import Editor from "../../common/component/Editor"

const NewStory = ({story}) => (
  <Fragment>
    <Title title="Add a new story" />

    <Editor {...{story}} />
  </Fragment>
)

NewStory.propTypes = {
  story: shape({}).isRequired
}

export default NewStory
