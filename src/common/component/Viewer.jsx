import {createElement} from "react"
import {node} from "prop-types"

import createSuspender from "use-suspender"

import getViewer from "lib/auth/helper/getViewer"

import Context from "common/model/User/Viewer/Context"
import Model from "common/model/User/Viewer"

const useGetViewer = createSuspender(getViewer)

function Viewer({children}) {
  const data = useGetViewer(getViewer)
  const viewer = data ? Model.create(data) : null

  return createElement(Context.Provider, {value: viewer}, children)
}

Viewer.propTypes = {
  children: node.isRequired
}

export default Viewer
