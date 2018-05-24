import {h} from "preact"

import Fragment from "common/component/Fragment"
import Title from "common/component/Title"
import Layout from "common/component/Layout"

const Feed = () => (
  <Fragment>
    <Title title="Stories Feed" />
    <Layout>
      <div>Stories feed page.</div>
    </Layout>
  </Fragment>
)

export default Feed
