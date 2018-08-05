import React, {Component, Children} from "react"
import {string, element, arrayOf, oneOfType} from "prop-types"

import Menu from "common/component/SidebarMenu"

import DefaultMenu from "./DefaultMenu"

import {container, content} from "./layout.scss"

const toArray = Children.toArray

class Layout extends Component {
  static propTypes = {
    children: oneOfType([
      string, element, arrayOf(element.isRequired)
    ]).isRequired
  }

  get hasMenu() {
    return !!this.menuContents
  }

  get menuContents() {
    return toArray(this.props.children).find(({type}) => type === Menu)
  }

  get pageContent() {
    return toArray(this.props.children).filter(({type}) => type !== Menu)
  }

  render() {
    return (
      <div className={container}>
        {this.hasMenu ? this.menuContents : <DefaultMenu />}

        <div className={content}>{this.pageContent}</div>
      </div>
    )
  }
}

export default Layout
