import React, {Fragment} from "react"

import Spinner from "react-spinners/SyncLoader"

import Title from "common/component/Title"

import {container} from "./loading.scss"

const PageLoader = () => (
  <Fragment>
    <Title title="Loading..." />
    <div className={container}>
      <Spinner color="#daade8" />
    </div>
  </Fragment>
)

export default PageLoader
