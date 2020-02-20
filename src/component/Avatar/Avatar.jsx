import {string, node} from "prop-types"
import {createElement} from "react"

import cn from "classnames"

import {container, fallback, small, medium, big, large} from "./avatar.css"

const sizes = {
  small,
  medium,
  big,
  large
}

const Avatar = ({className, children, path, size, alt}) => (
  <div className={cn(container, sizes[size], className)}>
    {
      do {
        if (path) {
          <img src={path} alt={alt} />
        } else {
          <div className={fallback}>
            <div>{alt.charAt(0)}</div>
          </div>
        }
      }
    }

    {children}
  </div>
)

Avatar.propTypes = {
  alt: string.isRequired,
  path: string,
  size: string,
  className: string,
  children: node
}

Avatar.defaultProps = {
  path: null,
  size: "medium",
  className: null,
  children: null
}

export default Avatar
