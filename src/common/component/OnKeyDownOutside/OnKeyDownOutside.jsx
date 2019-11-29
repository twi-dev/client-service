import {createRef, cloneElement, Component} from "react"
import {element, func} from "prop-types"

/**
 * Calls given onKeyDown listener when document.activeElement
 * is outside of child component
 */
class OnKeyDownOutside extends Component {
  ref = createRef()

  static propTypes = {
    children: element.isRequired,
    onKeyDown: func
  }

  static defaultProps = {
    onKeyDown: () => {}
  }

  componentDidMount() {
    document.body.addEventListener("keydown", this.onKeyDown, true)
  }

  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.onKeyDown, true)
  }

  onKeyDown = event => {
    if (this.ref.current?.contains(document.activeElement) === false) {
      this.props.onKeyDown(event)
    }
  }

  render() {
    return cloneElement(this.props.children, {ref: this.ref})
  }
}

export default OnKeyDownOutside
