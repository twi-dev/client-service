import {h} from "preact"

import Fragment from "common/component/Fragment"
import Title from "common/component/Title"

import {container} from "./page-loader.sss"

const PageLoader = () => (
  <Fragment>
    <Title title="Loading..." />
    <div class={container}>
      Loading
    </div>
  </Fragment>
)

export default PageLoader
