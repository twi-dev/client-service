import React from "react"

import {arrayOf, element} from "prop-types"

import {container} from "./menu-list.sss"

const List = ({children}) => (
  <ul className={container}>{children}</ul>
)

List.propTypes = {
  children: arrayOf(element.isRequired).isRequired
}

List.displayName = "MenuList"

export default List
