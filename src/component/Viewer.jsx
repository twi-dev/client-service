import {createElement} from "react"
import {node} from "prop-types"

import createSuspender from "use-suspender"

import getViewer from "lib/auth/helper/getViewer"

import Context from "model/User/Viewer/Context"
import Session from "model/User/Viewer/Session"

const useGetViewer = createSuspender(getViewer)

function Viewer({children}) {
  const data = useGetViewer(getViewer)
  const session = Session.create(data)

  return createElement(Context.Provider, {value: session}, children)
}

Viewer.propTypes = {
  children: node.isRequired
}

export default Viewer
