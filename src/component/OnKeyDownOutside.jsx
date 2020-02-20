import {cloneElement, useRef, useEffect} from "react"
import {element, func} from "prop-types"

function OnKeyDownOutside({children, onKeyDown}) {
  const ref = useRef(null)

  function handler(event) {
    if (!ref.current.contains(document.activeElement)) {
      onKeyDown(event)
    }
  }

  useEffect(() => {
    document.body.addEventListener("keydown", handler, true)

    return () => document.body.removeEventListener("keydown", handler, true)
  })

  return cloneElement(children, {ref})
}

OnKeyDownOutside.propTypes = {
  children: element.isRequired,
  onKeyDown: func.isRequired
}

export default OnKeyDownOutside
