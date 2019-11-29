import {hot} from "react-hot-loader/root"

// React should be bplaced after hot loader
import {createElement} from "react"

import Viewer from "lib/component/Viewer"

import Router from "lib/component/Router"
import ErrorHandler from "lib/error/application/ApplicationErrorHandler"

import Title from "common/component/Title"

import {container} from "./application.scss"

const Application = () => (
  <>
    <Title />

    <div className={container}>
      <ErrorHandler>
        <Viewer>
          <Router />
        </Viewer>
      </ErrorHandler>
    </div>
  </>
)

export default Application |> hot
