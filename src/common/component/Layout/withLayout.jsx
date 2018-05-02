import {h} from "preact"

import Layout from "."

const withLayout = Target => {
  const WithLayout = props => h(Layout, props, h(Target, props))

  return WithLayout
}

export default withLayout
