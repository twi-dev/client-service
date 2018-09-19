import React from "react"

import {oneOfType, string, number, element} from "prop-types"

import {container} from "./icon.scss"

const Icon = ({children}) => (
  <div className={container}>
    {children}
  </div>
)

Icon.displayName = "SidebarMenuPlainElementIcon"

Icon.propTypes = {
  children: oneOfType([string, number, element]).isRequired
}

export default Icon
