import React, {Fragment} from "react"

import Spinner from "react-spinners/dist/spinners/SyncLoader"

import Title from "common/component/Title"

import {container} from "./loading.sss"

const PageLoader = () => (
  <Fragment>
    <Title title="Loading..." />
    <div className={container}>
      <Spinner color="#daade8" />
    </div>
  </Fragment>
)

export default PageLoader
