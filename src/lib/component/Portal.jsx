import {createPortal, useEffect} from "react-dom"
import {node} from "prop-types"

function Portal({children}) {
  const container = document.createElement("div")

  useEffect(() => {
    document.body.appendChild(container)

    return () => document.body.removeChild(container)
  })

  return createPortal(children, container)
}

Portal.propTypes = {
  children: node.isRequired
}

export default Portal
