import {h, Component} from "preact"

import isFunction from "lodash/isFunction"

import {query} from "core/transport/graphql"

import isAuthenticated from "core/auth/isAuthenticated"

import Model from "./Model"

import getViewer from "./viewer.gql"

const assign = Object.assign

const withViewer = Target => {
  class Viewer extends Component {
    static async getInitialProps(...args) {
      if (!(await isAuthenticated())) {
        if (isFunction(Target.getInitialProps)) {
          return {
            ...(await Target.getInitialProps(...args)), viewer: null
          }
        }

        return {viewer: null}
      }

      const res = await query({query: getViewer})

      const viewer = Model.create(res.data.viewer)

      let props = {}
      if (Target.getInitialProps) {
        props = assign({}, props, await Target.getInitialProps(...args))
      }

      return assign({}, props, {viewer})
    }

    render() {
      return h(Target, this.props)
    }
  }

  return Viewer
}

export default withViewer
