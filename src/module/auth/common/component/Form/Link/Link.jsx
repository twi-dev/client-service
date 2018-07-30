import React from "react"
import cn from "classnames"
import omit from "lodash/omit"
import RouterLink from "react-router-dom/Link"

import {PropTypes as types} from "prop-types"

import {container} from "./link.sss"

const Link = props => (
  <div className={cn(container, props.className)}>
    <RouterLink {...{...omit(props, "className")}} />
  </div>
)

Link.propTypes = {
  className: types.string
}

Link.defaultProps = {
  className: undefined
}

export default Link
