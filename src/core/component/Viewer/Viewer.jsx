import React, {Fragment} from "react"
import {oneOfType, arrayOf, element, string} from "prop-types"

const Viewer = ({children}) => <Fragment>{children}</Fragment>

Viewer.propTypes = {
  children: oneOfType([
    arrayOf(string), arrayOf(element),
    string, element
  ]).isRequired
}

export default Viewer
