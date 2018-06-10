import {cloneElement, Component} from "preact"
import {element, func} from "prop-types"

import cn from "classnames"

import {proxy} from "./on-click-outside.sss"

class OnClickOutside extends Component {
  static propTypes = {
    onClickOutside: func,
    children: element.isRequired,
  }

  static defaultProps = {
    onClickOutside: () => {}
  }

  componentDidMount() {
    document.addEventListener("click", this.__handleClick, true)
    document.addEventListener("touchstart", this.__handleClick, true)
  }

  get children() {
    return this.props.children[0]
  }

  componnetWillUnmount() {
    document.removeEventListener("click", this.__handleClick, true)
    document.removeEventListener("touchstart", this.__handleClick, true)
  }


  __handleClick = event => {
    if (this.base && !this.base.contains(document.activeElement)) {
      this.props.onClickOutside(event)
    }
  }

  render() {
    return cloneElement(this.children, {
      class: cn(proxy, this.children.attributes.class),
      tabIndex: -1
    })
  }
}

export default OnClickOutside