import {h, Component} from "preact"
import {func} from "prop-types"

import isFunction from "lodash/isFunction"

import getName from "core/helper/component/getName"

const assign = Object.assign

const enhanceTextField = Target => {
  const name = getName(Target)

  class EnhanceTextField extends Component {
    static displayName = `EnhanceTextField(${name})`

    static propTypes = {
      onEnter: func,
      onEsc: func,
      onKeyPress: func,
      onKeyUp: func
    }

    static defaultProps = {
      onEnter: null,
      onEsc: null,
      onKeyPress: () => {},
      onKeyUp: () => {}
    }

    onEnter = e => {
      if (isFunction(this.props.onEnter) && e.key.toLowerCase() === "enter") {
        return void this.props.onEnter(e)
      }

      this.props.onKeyPress(e)
    }

    onEsc = e => {
      if (isFunction(this.props.onEsc) && e.key.toLowerCase() === "escape") {
        return void this.props.onEsc(e)
      }

      this.props.onKeyUp(e)
    }

    render() {
      return h(Target, assign({}, this.props, {
        onKeyPress: this.onEnter,
        onKeyUp: this.onEsc
      }))
    }
  }

  return EnhanceTextField
}

export default enhanceTextField
