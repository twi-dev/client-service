import {cloneElement, useEffect, useRef} from "react"
import {element, func} from "prop-types"

import cn from "classnames"

import {proxy} from "./on-click-outside.css"

function OnClickOutside({children, onClickOutside}) {
  const ref = useRef(null)

  function handler(event) {
    if (!ref.current.contains(document.activeElement)) {
      onClickOutside(event)
    }
  }

  useEffect(() => {
    window.addEventListener("click", handler, true)
    window.addEventListener("touchstart", handler, true)

    return () => {
      window.removeEventListener("click", handler, true)
      window.removeEventListener("touchstart", handler, true)
    }
  }, [])

  return cloneElement(children, {
    className: cn(proxy, this.children.attributes.className),
    tabIndex: -1,
    ref
  })
}

OnClickOutside.propTypes = {
  onClickOutside: func.isRequired,
  children: element.isRequired
}

export default OnClickOutside
