import {createElement} from "react"
import {render} from "react-dom"

// Imprort global styles
import "./main.scss"

import Application from "./Application"

const target = document.querySelector("#twi-root")

// Init the application
render(createElement(Application), target)

// Enable HRM
if (module.hot) {
  module.hot.accept()
}
