import {createPortal} from "react-dom"
import {useEffect} from "react"
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
