import {h} from "preact"

import Spinner from "react-spinners/dist/spinners/SyncLoader"

import Fragment from "common/component/Fragment"
import Title from "common/component/Title"

import {container} from "./loading.sss"

const PageLoader = () => (
  <Fragment>
    <Title title="Loading..." />
    <div class={container}>
      <Spinner color="#daade8" />
    </div>
  </Fragment>
)

export default PageLoader
