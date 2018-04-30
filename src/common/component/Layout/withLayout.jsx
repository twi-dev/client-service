import {h} from "preact"
// import inject from "mobx-preact"

import compose from "lodash/fp/compose"

import withViewer from "common/component/Viewer/withViewer"

import Layout from "."

const withLayout = Target => {
  const WithLayout = props => h(Layout, props, h(Target, props))

  return compose([withViewer])(WithLayout)
}

export default withLayout
