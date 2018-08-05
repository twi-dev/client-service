import {createElement as h, Component} from "react"
import {instanceOf} from "prop-types"

import getName from "core/helper/component/getName"

const logErrors = Target => {
  class LogErrors extends Component {
    static displayName = `LogErrors(${getName(Target)})`

    static propTypes = {
      error: instanceOf(Error).isRequired
    }

    componentDidMount() {
      if (process.env.NODE_ENV === "production") {
        console.error(this.error.message)
      } else {
        console.error(this.error)
      }
    }

    get error() {
      return this.props.error
    }

    render() {
      return h(Target, this.props)
    }
  }

  return LogErrors
}

export default logErrors
