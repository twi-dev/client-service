import {hot, setConfig} from "react-hot-loader"
import React, {Fragment} from "react"

import Viewer from "core/component/Viewer"

import Router from "core/component/Router"
import Title from "common/component/Title"

import {container} from "./application.scss"

const Application = () => (
  <Fragment>
    <Title />

    <div className={container}>
      <Viewer>
        <Router />
      </Viewer>
    </div>
  </Fragment>
)

// if (process.env.NODE_ENV !== "production") {
//   setConfig({logLevel: "debug"})
// }

setConfig({logLevel: "no-errors-please"})

export default Application |> hot(module)
