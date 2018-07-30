import React from "react"

import {hot} from "react-hot-loader"

import Router from "core/router"
import Title from "common/component/Title"

import {container} from "./application.sss"

const Application = () => (
  <div className={container}>
    <Title />

    <Router />
  </div>
)

export default Application |> hot(module)
