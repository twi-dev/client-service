import {createElement as h} from "react"

import setSession from "lib/auth/hoc/session"
import loadable from "lib/hoc/loadable"
import provider from "lib/model/provider"
import Loading from "lib/component/Loading"

import Model from "../model/Viewer"
import getViewer from "../graphql/query/getViewer"

const createViewer = viewer => ({viewer: viewer ? Model.create(viewer) : null})

const loadViewer = Target => setSession(
  loadable({
    name: "Viewer",
    delay: 300,

    // TODO: Add loading.onError win an AuthError matcher
    loading: Loading,

    loaders: ({session}) => session ? getViewer() : null,

    render: (viewer, props) => (
      h(Target |> provider(viewer |> createViewer), props)
    )
  })
)

export default loadViewer
