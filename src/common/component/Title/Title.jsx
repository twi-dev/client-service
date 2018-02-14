import {h} from "preact"
import {PropTypes as types} from "prop-types"

import Helmet from "react-helmet"

const Title = ({title}) => <Helmet {...{title}} />

Title.propTypes = {
  title: types.string
}

Title.defaultProps = {
  title: "Untitled"
}

export default Title
