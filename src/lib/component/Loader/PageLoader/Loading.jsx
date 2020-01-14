import {createElement, Fragment} from "react"

import Spinner from "react-spinners/SyncLoader"

import Title from "common/component/Title"

import {container} from "./loading.css"

const PageLoading = () => (
  <Fragment>
    <Title title="Loading..." />

    <div className={container}>
      {/* Check if color parameter can take custom property as a value */}
      <Spinner color="#daade8" />
    </div>
  </Fragment>
)

export default PageLoading
