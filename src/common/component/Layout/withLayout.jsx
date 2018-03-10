import {h} from "preact"

import isFunction from "lodash/isFunction"
import compose from "lodash/fp/compose"

import withAuth from "core/auth/withAuth"
import withViewer from "common/component/Viewer/withViewer"

import Layout from "."

const withLayout = Target => {
  const WithLayout = props => h(Layout, props, h(Target, props))

  if (isFunction(Target.getInitialProps)) {
    WithLayout.getInitialProps = Target.getInitialProps
  }

  return compose([withAuth, withViewer])(WithLayout)
}

export default withLayout
