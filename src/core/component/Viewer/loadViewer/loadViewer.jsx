import {createElement as h} from "react"

import setSession from "core/auth/hoc/session"
import loadable from "core/hoc/loadable"
import provider from "core/model/provider"
import Loading from "core/component/Loading"

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
