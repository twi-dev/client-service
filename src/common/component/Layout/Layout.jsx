import {h, Component} from "preact"
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
    return this.props.children.find(({nodeName}) => nodeName === Menu)
  }

  get pageContent() {
    return this.props.children.filter(({nodeName}) => nodeName !== Menu)
  }

  render() {
    return (
      <div class={container}>
        {this.hasMenu ? this.menuContents : <DefaultMenu />}

        <div class={content}>{this.pageContent}</div>
      </div>
    )
  }
}

export default Layout
