import {createElement} from "react"

import Spinner from "react-spinners/SyncLoader"

import Title from "common/component/Title"

import {container} from "./loading.scss"

const PageLoader = () => (
  <>
    <Title title="Loading..." />

    <div className={container}>
      <Spinner color="#daade8" />
    </div>
  </>
)

export default PageLoader
