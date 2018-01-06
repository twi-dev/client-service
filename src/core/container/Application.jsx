import {h} from "preact"
import {BrowserRouter} from "react-router-dom"

import routes from "core/router"

import "./style/application.sss"

import Router from "./Router"

const Application = () => (
  <div>
    <BrowserRouter>
      <Router {...{routes}} />
    </BrowserRouter>
  </div>
)

export default Application
