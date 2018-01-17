import {h} from "preact"
import {BrowserRouter} from "react-router-dom"

import routes from "core/router"

import {container} from "./style/application.sss"

import Router from "./Router"

const Application = () => (
  <div class={container}>
    <BrowserRouter>
      <Router {...{routes}} />
    </BrowserRouter>
  </div>
)

export default Application
