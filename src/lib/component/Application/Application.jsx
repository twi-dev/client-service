// React should be bplaced after hot loader
import {hot} from "react-hot-loader/root"
import {createElement} from "react"

import useTitle from "lib/hook/useTitle"
import config from "lib/config"

import DarkMode from "lib/component/DarkMode"
import Router from "lib/component/Router"

import {container} from "./application.css"

function Application() {
  useTitle(config.app.name)

  return (
    <DarkMode>
      <div className={container}>
        <Router />
      </div>
    </DarkMode>
  )
}

export default hot(Application)
