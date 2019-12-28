import {arrayOf, shape, element} from "prop-types"
import {createElement, Component} from "react"
import {inject, observer} from "mobx-react"
import {computed} from "mobx"

import cn from "classnames"

import provider from "lib/model/provider"

import Mask from "./component/internal/Mask"
import Logo from "./component/internal/Logo"
import List from "./component/internal/List"
import Toggler from "./component/internal/Toggler"

import Model from "./model/SidebarMenu"

import {container, panel, content, open} from "./sidebar-menu.css"

const isArray = Array.isArray

const models = () => ({menu: Model.create({})})

const mapStoresToProps = ({viewer, menu}) => ({viewer, menu})

@provider(models)
@inject(mapStoresToProps)
@observer
class SidebarMenu extends Component {
  static propTypes = {
    children: arrayOf(element.isRequired),
    menu: shape({}).isRequired
  }

  static defaultProps = {
    children: null
  }

  componentDidMount() {
    document.addEventListener("keydown", this.closeOnEsc)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.closeOnEsc)
  }

  @computed get menu() {
    return this.props.menu
  }

  closeOnEsc = ({key}) => {
    if (key.toLowerCase() === "escape" && this.menu.isOpen) {
      this.menu.close()
    }
  }

  render() {
    const {children} = this.props

    return (
      <div className={container}>
        <Mask />

        <div className={cn(panel, {[open]: this.menu.isOpen})}>
          <div className={content}>
            <Logo />

            {
              do {
                if (isArray(children)) {
                  <List>
                    {children}
                  </List>
                }
              }
            }

            <Toggler />
          </div>
        </div>
      </div>
    )
  }
}

export default SidebarMenu
