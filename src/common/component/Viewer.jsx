import {createElement} from "react"
import {node} from "prop-types"

import nanoid from "nanoid"

import useSuspender from "lib/hook/useSuspender"
import getViewer from "lib/auth/helper/getViewer"

import Context from "common/model/User/Viewer/Context"
import Model from "common/model/User/Viewer"

const random = nanoid()
const id = import.meta.url

function Viewer({children}) {
  const data = useSuspender({id, random}, getViewer)
  const viewer = data ? Model.create(data) : null

  return createElement(Context.Provider, {value: viewer}, children)
}

Viewer.propTypes = {
  children: node.isRequired
}

export default Viewer
