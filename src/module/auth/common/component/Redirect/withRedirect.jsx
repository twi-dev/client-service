import {h, Component} from "preact"
import {func} from "prop-types"
import {observer} from "mobx-preact"
import {Redirect} from "react-router-dom"

import isFunction from "lodash/isFunction"

import Loading from "common/component/Loading/Page"
import isAccessExpired from "core/auth/isTokenExpired"
import db from "core/db/tokens"

const withRedirect = Target => {
  class AuthRedirect extends Component {
    static propTypes = {
      onError: func.isRequired
    }

    state = {
      isChecked: false,
      isExpired: true
    }

    componentWillMount() {
      this.__areTokensExpired()
        .then(this.__onFulfilled).catch(this.props.onError)
    }

    __areTokensExpired = async () => (
      !!((await isAccessExpired()) && !(await db.getItem("refreshToken")))
    )

    __onFulfilled = isExpired => this.setState({isExpired, isChecked: true})

    render() {
      const {isChecked, isExpired} = this.state

      if (!isChecked) {
        return <Loading />
      }

      if (!isExpired) {
        return <Redirect to="/" />
      }

      return h(observer(Target), this.props)
    }
  }

  if (isFunction(Target.getInitialProps)) {
    AuthRedirect.getInitialProps = Target.getInitialProps
  }

  return AuthRedirect
}

export default withRedirect
