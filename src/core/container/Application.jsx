import {h} from "preact"
import {BrowserRouter} from "react-router-dom"

import router from "core/router"

import "./style/application.sss"

const Application = () => (
  <BrowserRouter>
    <div>Hello!</div>
  </BrowserRouter>
)

export default Application
