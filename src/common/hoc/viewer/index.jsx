import {h} from "preact"

import loadable from "core/hoc/loadable"
import loadingProcess from "core/hoc/loadingProcess"
import connect from "core/model/connect"

import ApplicationError from "core/page/error/ApplicationError"

import Loading from "./component/Loading"
import viewer from "./graphql/query/getViewer"

const LoadingProcess = loadingProcess({
  onLoading: Loading,
  onError: ApplicationError
})

const hoc = () => import("./viewer")

const loadableViewer = Target => loadable({
  loading: LoadingProcess,
  loaders: {viewer, hoc},

  render: ({loaded}, props) => (
    h(loaded.hoc(Target) |> connect(loaded.viewer), props)
  )
})

export default loadableViewer
