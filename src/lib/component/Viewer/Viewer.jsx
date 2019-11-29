import {oneOfType, arrayOf, element, string} from "prop-types"
import {createElement} from "react"

import loadViewer from "./loadViewer"

const Viewer = ({children}) => (
  <>
    {children}
  </>
)

Viewer.propTypes = {
  children: oneOfType([
    arrayOf(string), arrayOf(element),
    string, element
  ]).isRequired
}

export default Viewer |> loadViewer
