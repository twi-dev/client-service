import {createElement} from "react"
import {string} from "prop-types"

import cn from "classnames"

import {container, fallback, small, medium, big, large} from "./avatar.css"

const sizes = {
  small,
  medium,
  big,
  large
}

const Avatar = ({path, size, alt}) => (
  <div className={cn(container, sizes[size])}>
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
  </div>
)

Avatar.propTypes = {
  alt: string.isRequired,
  path: string,
  size: string
}

Avatar.defaultProps = {
  path: null,
  size: "medium"
}

export default Avatar
