import {h} from "preact"
import {BrowserRouter} from "react-router-dom"
import {SlotProvider} from "preact-slots"

import Routes from "core/routes"

import Title from "common/component/Title"

import {container} from "./application.sss"

const Application = () => (
  <SlotProvider>
    <div class={container}>
      <Title />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  </SlotProvider>
)

export default Application
