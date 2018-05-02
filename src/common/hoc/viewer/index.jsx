import {h} from "preact"

import loadable from "core/hoc/loadable"
import loadingProcess from "core/hoc/loadingProcess"
import connect from "core/model/connect"

import ApplicationError from "core/page/error/ApplicationError"

import Model from "./Model"
import Loading from "./component/Loading"
import viewer from "./graphql/query/getViewer"

const LoadingProcess = loadingProcess({
  onLoading: Loading,

  // TODO: Replace with AuthosizationError or ForbiddenError
  onError: ApplicationError
})

const hoc = () => import("./viewer")

const createViewer = state => ({viewer: state ? Model.create(state) : null})

const loadableViewer = Target => loadable({
  delay: 300,
  loading: LoadingProcess,
  loaders: {viewer, hoc},

  render: (loaded, props) => (
    h(loaded.hoc(Target) |> connect(loaded.viewer |> createViewer), props)
  )
})

export default loadableViewer
