import {arrayOf, element} from "prop-types"
import {createElement} from "react"

import {container} from "./menu-list.css"

const List = ({children}) => (
  <ul className={container}>
    {children}
  </ul>
)

List.propTypes = {
  children: arrayOf(element.isRequired).isRequired
}

List.displayName = "MenuList"

export default List
