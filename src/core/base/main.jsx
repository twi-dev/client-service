import {createElement} from "react"
import {render} from "react-dom"

// Imprort global styles
import "core/base/main.scss"

const target = document.querySelector("#twi-root")

function renderApplication() {
  const Application = require("core/component/Application").default

  render(createElement(Application), target)
}

// Enable HRM
if (module.hot) {
  module.hot.accept(["../component/Application"], renderApplication)
}

renderApplication()
