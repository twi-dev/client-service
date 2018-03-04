import {h} from "preact"
import {PropTypes as types} from "prop-types"

import Fragment from "common/component/Fragment"
import Title from "common/component/Title"

import {container} from "./page-loader.sss"

const PageLoader = ({text}) => (
  <Fragment>
    <Title title="Loading..." />
    <div class={container}>{text}</div>
  </Fragment>
)

PageLoader.propTypes = {
  text: types.string
}

PageLoader.defaultProps = {
  text: "Loading page..."
}

export default PageLoader
