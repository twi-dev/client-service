import {h, Component} from "preact"
import {element, arrayOf, oneOfType, instanceOf} from "prop-types"

const DefaultError = ({error}) => <div>{error}</div>

DefaultError.propTypes = {
  error: instanceOf(Error).isRequired
}

class ErrorHandler extends Component {
  static propTypes = {
    children: oneOfType([
      element.isRequired,
      arrayOf(element.isRequired).isRequired,
    ]).isRequired,
    errorComponent: element
  }

  static defaultProps = {
    errorComponent: DefaultError
  }

  state = {
    error: null
  }

  __onError = error => void this.setState({error})

  render() {
    const {children, errorComponent, ...props} = this.props
    const {error} = this.state

    return h(error ? errorComponent : children, props)
  }
}

export default ErrorHandler
