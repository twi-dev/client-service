import loadable from "core/hoc/loadable"
import errorHandler from "core/hoc/errorHandler"
import loadingProcess from "core/hoc/loadingProcess"
import Loading from "core/component/Loading"

const LoadingProcess = loadingProcess({
  onLoading: Loading,
  onError: errorHandler()
})

const LoadableApplicationRouter = loadable({
  loaders: () => import("./Router"),

  loading: LoadingProcess
})

export default LoadableApplicationRouter
