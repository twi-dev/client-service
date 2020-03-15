import {useLocalStore} from "mobx-react"
import {createElement} from "react"
import {node} from "prop-types"

import createSuspender from "use-suspender"

import getViewer from "api/query/user/viewer"

import Context from "model/User/Viewer/Context"
import Session from "model/User/Viewer/Session"

const useGetViewer = createSuspender(getViewer)

/**
 * Creates a Viewer model context alloving the application to share
 * the current user's information.
 */
function Viewer({children}) {
  const viewer = useGetViewer(getViewer)

  const session = useLocalStore(() => Session.create(viewer))

  return createElement(Context.Provider, {value: session}, children)
}

Viewer.propTypes = {
  children: node.isRequired
}

export default Viewer
