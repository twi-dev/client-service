import {h, Component} from "preact"
import {shape, bool} from "prop-types"
import {observer} from "mobx-preact"
import {Redirect} from "react-router-dom"

const withRedirect = Target => {
  class AuthRedirect extends Component {
    static propTypes = {
      session: shape({
        isAccessExpired: bool
      })
    }

    static defaultProps = {
      session: null
    }

    render() {
      const {session} = this.props

      if (session && !session.isAccessExpired) {
        return <Redirect to="/" />
      }

      return h(observer(Target), this.props)
    }
  }

  return AuthRedirect
}

export default withRedirect
