import {createElement as h} from "react"

import setSession from "core/auth/hoc/session"
import loadable from "core/hoc/loadable"
import connect from "core/model/connect"
import Loading from "core/component/Loading"
import loadingProcess from "core/hoc/loadingProcess"
import ApplicationError from "core/component/Error/ApplicationError"

import Model from "./model/Viewer"
import getViewer from "./graphql/query/getViewer"

const LoadingProcess = loadingProcess({
  onLoading: Loading,

  // TODO: Replace with AuthosizationError or ForbiddenError
  onError: ApplicationError
})

const createViewer = viewer => ({viewer: viewer ? Model.create(viewer) : null})

const loadableViewer = setSession(
  loadable({
    delay: 300,
    loading: LoadingProcess,
    loaders: {
      viewer: ({session}) => session ? getViewer() : null,

      Component: () => import("./Viewer")
    },

    render: ({Component, viewer}, props) => (
      h(Component |> connect(viewer |> createViewer), props)
    )
  })
)

export default loadableViewer
