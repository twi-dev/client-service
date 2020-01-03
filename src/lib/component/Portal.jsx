import {node, string, instanceOf, oneOfType} from "prop-types"
import {createPortal} from "react-dom"
import {useEffect, memo} from "react"

import isString from "lodash/isString"

function Portal({children, container}) {
  if (isString(container)) {
    container = document.createElement(container)
  }

  useEffect(() => {
    document.body.appendChild(container)

    return () => document.body.removeChild(container)
  })

  return createPortal(children, container)
}

Portal.propTypes = {
  children: node.isRequired,
  container: oneOfType([string, instanceOf(HTMLElement)])
}

Portal.defaultProps = {
  container: "div"
}

export default Portal |> memo
