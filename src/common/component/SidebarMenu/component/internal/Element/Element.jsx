import {shape, oneOfType, arrayOf, string, bool, node} from "prop-types"
import {createElement, Component, Children} from "react"
import {inject, observer} from "mobx-react"

import cn from "classnames"

import {container, open} from "./element.css"

const toArray = Children.toArray

@inject("menu") @observer
class Element extends Component {
  static displayName = "SidebarMenuPlainElement"

  static propTypes = {
    children: oneOfType([arrayOf(node), node]).isRequired,
    title: string,
    menu: shape({
      isOpen: bool.isRequired,
      isHidden: bool.isRequired
    }).isRequired
  }

  static defaultProps = {
    title: null
  }

  get elements() {
    const elements = toArray(this.props.children)

    if (elements.length > 1) {
      return {
        icon: elements[0],
        label: elements[1]
      }
    }

    return {icon: null, label: elements[0]}
  }

  get icon() {
    return this.elements.icon
  }

  get label() {
    return this.elements.label
  }

  render() {
    const {isOpen} = this.props.menu

    return (
      <div title={this.props.title} className={cn(container, {[open]: isOpen})}>
        {this.icon}

        {this.label}
      </div>
    )
  }
}

export default Element
