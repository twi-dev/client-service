import {h} from "preact"

import loadable from "react-loadable"

import connect from "core/model/connect"
import Loading from "common/component/Loading/Page"

const loadPage = ({delay, timeout, ...loaders} = {}) => loadable.Map({
  loader: loaders,
  loading: Loading,
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
