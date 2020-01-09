// React should be bplaced after hot loader
import {hot} from "react-hot-loader/root"
import {createElement} from "react"

import useTitle from "react-use/lib/useTitle"

import config from "lib/config"

// import Viewer from "lib/component/Viewer"
// import Router from "lib/component/Router"

import {container} from "./application.css"

function Application() {
  useTitle(config.app.name)

  return (
    <div className={container}>
      Foo
    </div>
  )
}

export default Application |> hot
