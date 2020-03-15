// React should be placed after hot loader
import {hot} from "react-hot-loader/root"
import {createElement, Suspense} from "react"

import useTitle from "lib/hook/useTitle"
import config from "lib/config"

import Loader from "lib/component/Loader/PageLoader"
import DarkMode from "lib/component/DarkMode"
import Router from "lib/component/Router"
import Viewer from "component/Viewer"

import {container} from "./application.css"

function Application() {
  useTitle(config.app.name)

  return (
    <div className={container}>
      <Suspense fallback={<Loader />}>
        <Viewer>
          <DarkMode>
            <Router />
          </DarkMode>
        </Viewer>
      </Suspense>
    </div>
  )
}

export default hot(Application)
