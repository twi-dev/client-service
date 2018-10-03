import React from "react"
import cn from "classnames"
import RouterLink from "react-router-dom/Link"

import {PropTypes as types} from "prop-types"

import {container} from "./link.scss"

const Link = ({className, ...props}) => (
  <div className={cn(container, className)}>
    <RouterLink {...props} />
  </div>
)

Link.propTypes = {
  className: types.string
}

Link.defaultProps = {
  className: undefined
}

export default Link
