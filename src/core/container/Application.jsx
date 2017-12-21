import {h} from "preact"
import {BrowserRouter} from "react-router-dom"

import routes from "core/router"

import "./style/application.sss"

import Router from "./Router"

const Application = () => (
  <BrowserRouter>
    <Router {...{routes}} />
  </BrowserRouter>
)

export default Application
