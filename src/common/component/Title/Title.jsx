import React from "react"
import Helmet from "react-helmet"
import isString from "lodash/isString"

import {string} from "prop-types"

import {app} from "config"

const Title = ({title}) => <Helmet {...{title}} />

Title.propTypes = {
  title: string
}

Title.defaultProps = {
  title: app.name && isString(app.name) ? app.name : "Untitled"
}

export default Title
