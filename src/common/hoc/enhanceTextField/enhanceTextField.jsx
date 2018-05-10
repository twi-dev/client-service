import {h, Component} from "preact"
import {func} from "prop-types"

import getName from "core/helper/component/getName"

const assign = Object.assign

const enhanceTextField = Target => {
  const name = getName(Target)

  class EnhanceTextField extends Component {
    static displayName = `EnhanceTextField(${name})`

    static propTypes = {
      onEnter: func,
      onEsc: func
    }

    static defaultProps = {
      onEnter: () => {},
      onEsc: () => {}
    }

    onEnter = event => {
      if (event.key.toLowerCase() === "enter") {
        this.props.onEnter(event)
      }
    }

    onEsc = event => {
      if (event.key.toLowerCase() === "escape") {
        this.props.onEsc(event)
      }
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
