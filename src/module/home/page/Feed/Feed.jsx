import {h} from "preact"

import Fragment from "common/component/Fragment"
import Title from "common/component/Title"

import withLayout from "common/component/Layout/withLayout"

const Feed = () => (
  <Fragment>
    <Title title="Stories Feed" />
    <div>Stories feed page.</div>
  </Fragment>
)

export default withLayout(Feed)
