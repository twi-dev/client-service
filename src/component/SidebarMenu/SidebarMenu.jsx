import {createElement, useContext} from "react"
import {observer} from "mobx-react"

import Avatar from "component/Avatar"

import Viewer from "model/User/Viewer/Context"

import {container} from "./sidebar-menu.css"

function SidebarMenu() {
  const viewer = useContext(Viewer)

  return (
    <div className={container}>
      <Avatar
        path={viewer.avatar?.path}
        alt={viewer.login}
      />
    </div>
  )
}

export default SidebarMenu |> observer
