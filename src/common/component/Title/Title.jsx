import {createElement} from "react"
import {string} from "prop-types"

import isString from "lodash/isString"
import Helmet from "react-helmet"

import config from "lib/config"

const {app} = config

const Title = ({title}) => <Helmet {...{title}} />

Title.propTypes = {
  title: string
}

Title.defaultProps = {
  title: app.name && isString(app.name) ? app.name : "Untitled"
}

export default Title
