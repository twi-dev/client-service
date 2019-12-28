import {createElement} from "react"
import {render} from "react-dom"

// Imprort global styles
import "base/main.css"

const target = document.querySelector("#twi-root")

function renderApplication() {
  const Application = require("lib/component/Application").default

  render(createElement(Application), target)
}

// Enable HRM
if (module.hot) {
  module.hot.accept(["../lib/component/Application"], renderApplication)
}

renderApplication()
