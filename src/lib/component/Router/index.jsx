import Loading from "lib/component/Loading"
import loadable from "lib/hoc/loadable"

const LoadableApplicationRouter = loadable({
  loaders: () => import("./Router"),

  loading: Loading,
  name: "ApplicationRouter"
})

export default LoadableApplicationRouter
