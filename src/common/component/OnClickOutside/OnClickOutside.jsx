import {cloneElement, Component, Children} from "react"
import {element, func} from "prop-types"

import cn from "classnames"

import {proxy} from "./on-click-outside.css"

const toArray = Children.toArray

class OnClickOutside extends Component {
  static propTypes = {
    onClickOutside: func,
    children: element.isRequired,
  }

  static defaultProps = {
    onClickOutside: () => {}
  }

  componentDidMount() {
    document.addEventListener("click", this.__handler, true)
    document.addEventListener("touchstart", this.__handler, true)
  }

  get children() {
    return toArray(this.props.children)[0]
  }

  __handler = event => {
    if (this.base && !this.base.contains(document.activeElement)) {
      this.props.onClickOutside(event)
    }
  }

  componetWillUnmount() {
    document.removeEventListener("click", this.__handler, true)
    document.removeEventListener("touchstart", this.__handler, true)
  }

  render() {
    return cloneElement(this.children, {
      className: cn(proxy, this.children.attributes.className),
      tabIndex: -1
    })
  }
}

export default OnClickOutside
