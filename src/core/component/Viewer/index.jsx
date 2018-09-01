import {createElement as h} from "react"

import session from "core/auth/hoc/session"
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

const createViewer = state => ({viewer: state ? Model.create(state) : null})

const loadableViewer = session(
  loadable({
    delay: 300,
    loading: LoadingProcess,
    loaders: {
      viewer: () => getViewer(),

      Component: () => import("./Viewer")
    },

    render: ({Component, viewer}, props) => (
      h(Component |> connect(viewer |> createViewer), props)
    )
  })
)

export default loadableViewer
