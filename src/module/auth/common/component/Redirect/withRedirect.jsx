import {h, Component} from "preact"
import {shape, bool} from "prop-types"
import {observer} from "mobx-preact"
import {Redirect} from "react-router-dom"

import isFunction from "lodash/isFunction"

import withAuth from "core/auth/withAuth"

const withRedirect = Target => {
  class AuthRedirect extends Component {
    static propTypes = {
      auth: shape({
        isAccessExpired: bool
      })
    }

    static defaultProps = {
      auth: {
        isAccessExpired: true
      }
    }

    render() {
      if (!this.props.auth.isAccessExpired) {
        return <Redirect to="/" />
      }

      return h(observer(Target), this.props)
    }
  }

  if (isFunction(Target.getInitialProps)) {
    AuthRedirect.getInitialProps = Target.getInitialProps
  }

  return withAuth(AuthRedirect)
}

export default withRedirect
