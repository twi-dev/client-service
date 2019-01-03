import loadable from "core/hoc/loadable"
import Loading from "core/component/Loading"

const LoadableApplicationRouter = loadable({
  loaders: () => import("./Router"),

  loading: Loading,
  name: "ApplicationRouter"
})

export default LoadableApplicationRouter
