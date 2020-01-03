import {createElement, Component} from "react"
import {func, shape} from "prop-types"

import omit from "lodash/omit"

import forward from "lib/hoc/forwardRef"
import getName from "lib/helper/component/getName"

const enhanceTextField = Target => {
  @forward class EnhanceTextField extends Component {
    static displayName = `EnhanceTextField(${getName(Target)})`

    static propTypes = {
      onEnter: func,
      onEsc: func,
      onKeyPress: func,
      onKeyUp: func,
      forwardedRef: shape({})
    }

    static defaultProps = {
      onEnter: () => {},
      onEsc: () => {},
      onKeyPress: () => {},
      onKeyUp: () => {},
      forwardedRef: null
    }

    onEnter = event => {
      if (event.key.toLowerCase() === "enter") {
        return void this.props.onEnter(event)
      }

      this.props.onKeyPress(event)
    }

    onEsc = event => {
      if (event.key.toLowerCase() === "escape") {
        return void this.props.onEsc(event)
      }

      this.props.onKeyUp(event)
    }

    render() {
      return createElement(
        Target,

        {...omit(this.props, ["onEsc", "onEnter", "forwardedRef"]),
          onKeyPress: this.onEnter,
          onKeyUp: this.onEsc,
          ref: this.props.forwardedRef}
      )
    }
  }

  return EnhanceTextField
}

export default enhanceTextField
