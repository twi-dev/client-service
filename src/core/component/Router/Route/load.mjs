// import loadingProcess from "core/hoc/loadingProcess"
import loadablePage from "core/hoc/loadable/page"

function load({Component: component, state: loaders, loading, ...params}) {
  return loadablePage({...params, component, loaders, loading})
}

export default load
