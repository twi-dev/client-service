import React from "react"
import Route from "react-router-dom/Route"

import DefaultLayout from "common/component/Layout"

const ApplicationRoute = ({component: Target, layout: Layout, ...others}) => (
  <Route
    {...others}

    render={
      props => do {
        if (Layout === false) {
          <Target {...props} />
        } else if (!Layout) {
          <DefaultLayout>
            <Target {...props} />
          </DefaultLayout>
        } else {
          <Layout>
            <Target {...props} />
          </Layout>
        }
      }
    }
  />
)

export default ApplicationRoute
