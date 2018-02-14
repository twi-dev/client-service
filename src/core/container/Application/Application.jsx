import {h} from "preact"
import {BrowserRouter} from "react-router-dom"

import routes from "core/router"
import Title from "common/component/Title"

import {container} from "./application.sss"

import Router from "../Router"

const Application = () => (
  <div class={container}>
    <Title />
    <BrowserRouter>
      <Router {...{routes}} />
    </BrowserRouter>
  </div>
)

export default Application
