import {parse} from "query-string"

import {h, Component} from "preact"
import {shape, string, bool} from "prop-types"
import {observer} from "mobx-preact"
import {Redirect} from "react-router-dom"

const withRedirect = Target => {
  class AuthRedirect extends Component {
    static propTypes = {
      session: shape({
        isAccessExpired: bool
      }),

      location: shape({
        search: string
      }).isRequired
    }

    static defaultProps = {
      session: null
    }

    get to() {
      if (!this.props.location.search) {
        return "/"
      }

      const {redirect = "/"} = parse(this.props.location.search) || {}

      return redirect
    }

    render() {
      const {session} = this.props
      const {to} = this

      if (session && !session.isAccessExpired) {
        return <Redirect {...{to}} />
      }

      return h(observer(Target), this.props)
    }
  }

  return AuthRedirect
}

export default withRedirect
