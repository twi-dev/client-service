import {createElement, Component, createRef} from "react"
import {string, bool} from "prop-types"

import omit from "lodash/omit"
import cn from "classnames"

import {container} from "./input.scss"

class Input extends Component {
  base = createRef()

  static propTypes = {
    type: string,
    className: string,
    autoFocus: bool
  }

  static defaultProps = {
    type: "text",
    className: null,
    autoFocus: false
  }

  componentDidMount() {
    if (this.props.autoFocus === true) {
      setImmediate(() => this.input.focus())
    }
  }

  get input() {
    return this.base.current
  }

  render() {
    return (
      <input
        {...omit(this.props, "className")}

        ref={this.base}
        className={cn(this.props.className, container)}
      />
    )
  }
}

export default Input
