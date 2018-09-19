import React, {Component, Children} from "react"
import {inject, observer} from "mobx-react"
import {
  shape, oneOfType, arrayOf,
  string, number, element, bool
} from "prop-types"

import cn from "classnames"

import {container, open} from "./element.scss"

const toArray = Children.toArray

@inject("menu") @observer
class Element extends Component {
  static displayName = "SidebarMenuPlainElement"

  static propTypes = {
    children: oneOfType([arrayOf(element), string, number, element]).isRequired,
    menu: shape({
      isOpen: bool.isRequired,
      isHidden: bool.isRequired
    }).isRequired
  }

  get elements() {
    const elements = toArray(this.props.children)

    if (elements.length > 1) {
      return {
        icon: elements[0],
        text: elements[1]
      }
    }

    return {icon: null, text: elements[0]}
  }

  get icon() {
    return this.elements.icon
  }

  get text() {
    return this.elements.text
  }

  render() {
    return (
      <div className={cn(container, {[open]: this.props.menu.isOpen})}>
        {this.icon}

        {this.text}
      </div>
    )
  }
}

export default Element
