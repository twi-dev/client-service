import {createElement} from "react"
import {string} from "prop-types"

import {Link as Base} from "react-router-dom"

import cn from "classnames"

import {container} from "./link.scss"

const Link = ({className, ...props}) => (
  <div className={cn(container, className)}>
    <Base {...props} />
  </div>
)

Link.propTypes = {
  className: string
}

Link.defaultProps = {
  className: undefined
}

export default Link
