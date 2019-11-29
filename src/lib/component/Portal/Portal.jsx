import {oneOfType, arrayOf, element, string, number} from "prop-types"
import {createPortal} from "react-dom"
import {Component} from "react"

class Portal extends Component {
  static propTypes = {
    children: oneOfType([string, number, element, arrayOf(element)]).isRequired
  }

  constructor() {
    super()

    this.__container = document.createElement("div")
  }

  componentDidMount() {
    document.body.appendChild(this.__container)
  }

  componentWillUnmount() {
    document.body.removeChild(this.__container)
  }

  render() {
    return createPortal(this.props.children, this.__container)
  }
}

export default Portal
