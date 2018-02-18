import {h, render} from "preact"

// Imprort global styles
import "./main.sss"

const container = document.querySelector("#twi-root")

let root
function init() {
  const Application = require("core/container/Application").default

  root = render(<Application />, container, root)
}

// Enable HRM for Preact
if (module.hot) {
  require("preact/devtools") // Inject Preact dev tools

  module.hot.accept(["../container/Application"], init)
}

// Init the application
init()
