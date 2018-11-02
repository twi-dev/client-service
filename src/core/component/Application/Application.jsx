import {hot, setConfig} from "react-hot-loader"
import React, {Fragment} from "react"

import Provider from "core/error/Provider"
import Viewer from "core/component/Viewer"

import Router from "core/component/ApplicationRouter"
import Title from "common/component/Title"

import {container} from "./application.scss"

const Application = () => (
  <Fragment>
    <Title />

    <div className={container}>
      <Provider>
        <Viewer>
          <Router />
        </Viewer>
      </Provider>
    </div>
  </Fragment>
)

// if (process.env.NODE_ENV !== "production") {
//   setConfig({logLevel: "debug"})
// }

setConfig({logLevel: "no-errors-please"})

export default Application |> hot(module)
