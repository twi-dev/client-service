import loadablePage from "core/hoc/loadable/page"

const LoadablePage = loadablePage({
  loaders: {
    Component: () => import("./Feed")
  }
})

export default LoadablePage
