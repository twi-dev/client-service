import {h} from "preact"
import {shape} from "prop-types"

import Fragment from "common/component/Fragment"
import Title from "common/component/Title"
import Layout from "common/component/Layout"

import Editor from "../../common/component/Editor"

const NewStory = ({story}) => (
  <Fragment>
    <Title title="Add a new story" />

    <Layout>
      <Editor {...{story}} />
    </Layout>
  </Fragment>
)

NewStory.propTypes = {
  story: shape({}).isRequired
}

export default NewStory
