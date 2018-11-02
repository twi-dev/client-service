import React, {Fragment} from "react"
import {oneOfType, arrayOf, element, string} from "prop-types"

import loadViewer from "./loadViewer"

const Viewer = ({children}) => <Fragment>{children}</Fragment>

Viewer.propTypes = {
  children: oneOfType([
    arrayOf(string), arrayOf(element),
    string, element
  ]).isRequired
}

export default Viewer |> loadViewer
