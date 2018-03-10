import {h, Component} from "preact"

import {query} from "core/transport/graphql"

import Model from "./Model"

import getViewer from "./viewer.gql"

const assign = Object.assign

const withViewer = Target => {
  class Viewer extends Component {
    static async getInitialProps(...args) {
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
