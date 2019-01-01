import {hot} from "react-hot-loader/root"

import React, {Fragment} from "react"

import Viewer from "core/component/Viewer"

import Router from "core/component/Router"
import ErrorHandler from "core/error/application/ApplicationErrorHandler"

import Title from "common/component/Title"

import {container} from "./application.scss"

const Application = () => (
  <Fragment>
    <Title />

    <div className={container}>
      <ErrorHandler>
        <Viewer>
          <Router />
        </Viewer>
      </ErrorHandler>
    </div>
  </Fragment>
)

export default Application |> hot
