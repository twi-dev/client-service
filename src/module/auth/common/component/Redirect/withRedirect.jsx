import {h, Component} from "preact"
import {shape, bool} from "prop-types"
import {observer} from "mobx-preact"
import {Redirect} from "react-router-dom"

const withRedirect = Target => {
  class AuthRedirect extends Component {
    static propTypes = {
      auth: shape({
        isAccessExpired: bool
      })
    }

    static defaultProps = {
      auth: null
    }

    render() {
      const {auth} = this.props

      if (!auth || !auth.isAccessExpired) {
        return <Redirect to="/" />
      }

      return h(observer(Target), this.props)
    }
  }

  return AuthRedirect
}

export default withRedirect
