import {h} from "preact"
import {PropTypes as types} from "prop-types"

import Helmet from "react-helmet"
import isString from "lodash/isString"

import {app} from "config"

const Title = ({title}) => <Helmet {...{title}} />

Title.propTypes = {
  title: types.string
}

Title.defaultProps = {
  title: app.name && isString(app.name) ? app.name : "Untitled"
}

export default Title
