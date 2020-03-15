import {createElement, Fragment} from "react"
import {observer} from "mobx-react"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHome, faSignOutAlt, faPlus} from "@fortawesome/free-solid-svg-icons"

import useStore from "lib/hook/useStore"

import Link from "component/Link"
import Avatar from "component/Avatar"
import LogOut from "component/LogOut"

import Viewer from "model/User/Viewer/Context"

import {container, item, spacing} from "./sidebar-menu.css"

function SidebarMenu() {
  const {viewer, isSigned} = useStore(Viewer)

  return (
    <div className={container}>
      <Link to="/" color="secondary">
        <div className={item}>
          <FontAwesomeIcon icon={faHome} size="2x" />
        </div>
      </Link>

      {
        do {
          if (isSigned) {
            <Fragment>
              <div className={item}>
                <Avatar
                  path={viewer.avatar?.path}
                  alt={viewer.login}
                />
              </div>

              <Link to="/new">
                <div className={item}>
                  <FontAwesomeIcon icon={faPlus} size="2x" />
                </div>
              </Link>
            </Fragment>
          }
        }
      }

      <div className={spacing} />

      {
        do {
          if (isSigned) {
            <LogOut className={item}>
              <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
            </LogOut>
          }
        }
      }
    </div>
  )
}

export default SidebarMenu |> observer
