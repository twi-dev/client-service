import {h} from "preact"
import {BrowserRouter} from "react-router-dom"

import Routes from "core/routes"

import Title from "common/component/Title"

import {container} from "./application.sss"

const Application = () => (
  <div class={container}>
    <Title />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </div>
)

export default Application
