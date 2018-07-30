import React, {Component} from "react"
import {element, arrayOf} from "prop-types"

import Menu from "common/component/SidebarMenu"

import DefaultMenu from "./DefaultMenu"

import {container, content} from "./layout.sss"

class Layout extends Component {
  static propTypes = {
    children: arrayOf(element.isRequired).isRequired
  }

  get hasMenu() {
    return !!this.menuContents
  }

  get menuContents() {
    return this.props.children.find(({type}) => type === Menu)
  }

  get pageContent() {
    return this.props.children.filter(({type}) => type !== Menu)
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
