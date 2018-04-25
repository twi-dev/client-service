import {h} from "preact"

import connect from "core/model/connect"
import loadable from "core/hoc/loadable"
import Loading from "common/component/Loading/Page"

import loadingProcess from "../loadingProcess"
import errorHandler from "../errorHandler"

const LoadingProcess = loadingProcess({
  onLoading: Loading,
  onError: errorHandler()
})

const loadPage = ({delay, timeout, ...loaders} = {}) => loadable({
  delay: delay || 300,
  timeout,
  loaders,
  loading: LoadingProcess,
  render({component, state}, props) {
    if (state) {
      component = connect(state)(component)
    }

    return h(component, props)
  }
})

export default loadPage
