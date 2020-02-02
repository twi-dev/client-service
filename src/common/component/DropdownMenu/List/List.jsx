import {string, node, bool} from "prop-types"
import {createElement} from "react"

import cn from "classnames"

import {container, hidden} from "./list.css"

// TOOD: Implement list postions
const positions = {}

const List = ({isVisible, position, className, children}) => (
  <div
    className={
      cn(container, {[hidden]: !isVisible}, positions[position], className)
    }
  >
    {children}
  </div>
)

List.displayName = "DropdownMenuList"

List.propTypes = {
  isVisible: bool,
  position: string,
  className: string,
  children: node.isRequired
}

List.defaultProps = {
  isVisible: false,
  position: "bottom",
  className: undefined
}

export default List
