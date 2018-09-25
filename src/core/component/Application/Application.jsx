import React from "react"

import {hot} from "react-hot-loader"

import Provider from "core/error/Provider"
import Viewer from "core/component/Viewer"

import Router from "core/component/ApplicationRouter"
import Title from "common/component/Title"

import {container} from "./application.scss"

const Application = () => (
  <div className={container}>
    <Title />

    <Provider>
      <Viewer>
        <Router />
      </Viewer>
    </Provider>
  </div>
)

export default Application |> hot(module)
