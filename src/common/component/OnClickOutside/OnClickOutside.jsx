import {h, Component} from "preact"
import {arrayOf, element, string, func} from "prop-types"

import cn from "classnames"

import Fragment from "common/component/Fragment"

import {container} from "./on-click-outside.sss"

const isArray = Array.isArray

class OnClickOutside extends Component {
  static propTypes = {
    onClickOutside: func,
    children: arrayOf(element.isRequired).isRequired,
    class: string
  }

  static defaultProps = {
    onClickOutside: () => {},
    class: undefined
  }

  componentDidMount() {
    document.addEventListener("click", this.__handleClick, true)
    document.addEventListener("touchstart", this.__handleClick, true)
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

  render({children}) {
    // TODO: Replace with Preact fragments when this will be released:
    //   https://github.com/developit/preact/pull/1080
    return (
      <Fragment
        {...this.props}

        class={cn(container, this.props.class)}
        tabIndex={-1}
      >
        {isArray(children) ? children[0] : children}
      </Fragment>
    )
  }
}

export default OnClickOutside
