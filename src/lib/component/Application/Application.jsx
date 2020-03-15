// React should be placed after hot loader
import {hot} from "react-hot-loader/root"
import {createElement, Suspense} from "react"

import useTitle from "lib/hook/useTitle"
import config from "lib/config"

import ApplicationError from "lib/component/Error/ApplicationError"
import Loader from "lib/component/Loader/PageLoader"
import DarkMode from "lib/component/DarkMode"
import Router from "lib/component/Router"
import Delay from "lib/component/Delay"
import Error from "lib/component/Error"

import Viewer from "component/Viewer"

import {container} from "./application.css"

function Application() {
  useTitle(config.app.name)

  return (
    <div className={container}>
      <Suspense
        fallback={(
          <Delay>
            <Loader />
          </Delay>
        )}
      >
        <Error fallback={ApplicationError}>
          <Viewer>
            <DarkMode>
              <Router />
            </DarkMode>
          </Viewer>
        </Error>
      </Suspense>
    </div>
  )
}

export default hot(Application)
