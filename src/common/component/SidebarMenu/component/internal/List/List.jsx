import {h} from "preact"
import {arrayOf, element} from "prop-types"

import {container} from "./menu-list.sss"

const List = ({children}) => (
  <ul class={container}>Foo</ul>
)

List.propTypes = {
  children: arrayOf(element.isRequired).isRequired
}

List.displayName = "MenuList"

export default List
