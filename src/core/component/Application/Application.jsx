import React from "react"

import {hot} from "react-hot-loader"

import Viewer from "core/component/Viewer"

import Router from "core/component/ApplicationRouter"
import Title from "common/component/Title"

import {container} from "./application.scss"

const Application = () => (
  <div className={container}>
    <Title />

    <Viewer>
      <Router />
    </Viewer>
  </div>
)

export default Application |> hot(module)
