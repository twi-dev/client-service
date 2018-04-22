import {h} from "preact"

import loadable from "react-loadable"

import connect from "core/model/connect"
import Loading from "common/component/Loading/Page"

import loadingProcess from "../loadingProcess"
import errorHandler from "../errorHandler"

const LoadingProcess = loadingProcess({
  onLoading: Loading,
  onError: errorHandler()
})

const loadPage = ({delay, timeout, ...loaders} = {}) => loadable.Map({
  delay,
  timeout,
  loader: loaders,
  loading: LoadingProcess,
  render({component, state}, props) {
    if (component.default) {
      component = component.default
    }

    if (state) {
      component = connect(state)(component)
    }

    return h(component || component, props)
  }
})

export default loadPage
