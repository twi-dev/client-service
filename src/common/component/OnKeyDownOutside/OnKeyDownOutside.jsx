import {createRef, cloneElement, Component} from "react"
import {element, func} from "prop-types"
import {hot} from "react-hot-loader"

/**
 * Calls given onKeyDown listener when document.activeElement
 * is outside of child component
 */
class OnKeyDownOutside extends Component {
  static propTypes = {
    children: element.isRequired,
    onKeyDown: func
  }

  static defaultProps = {
    onKeyDown: () => {}
  }

  ref = createRef()

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

export default OnKeyDownOutside |> hot(module)
