import {createElement as h} from "react"

import Layout from "."

const withLayout = Target => {
  const WithLayout = props => h(Layout, props, h(Target, props))

  return WithLayout
}

export default withLayout
