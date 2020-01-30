import {createElement, useContext} from "react"
import {observer} from "mobx-react"

import Viewer from "common/model/User/Viewer/Context"

import {container} from "./sidebar-menu.css"

function SidebarMenu() {
  const viewer = useContext(Viewer)

  return (
    <div className={container}>
      Twi
    </div>
  )
}

export default SidebarMenu |> observer
