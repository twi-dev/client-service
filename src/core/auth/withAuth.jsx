// UNAUTHORIZED_EXCEPTION
import {h, Component} from "preact"
import {func} from "prop-types"
import {observer} from "mobx-preact"

import waterfall from "p-waterfall"
import isFunction from "lodash/isFunction"

import db from "core/db/tokens"
import saveTokens from "core/auth/saveTokens"

import {mutate} from "core/transport/graphql"

import isTokenExpired from "./isTokenExpired"
import refresh from "./refreshAccessToken.gql"

const withAuth = Target => {
  const name = Target.displayName || Target.name || "Unknown"

  class Auth extends Component {
    static displayName = `${Auth.name}(${name})`

    static propTypes = {
      onError: func.isRequired
    }

    state = {
      isSuccess: false
    }

    componentWillMount() {
      if (this.state.isSuccess) {
        return
      }

      waterfall([
        isTokenExpired,
        this.__tryRefreshToken,
        this.__onSuccess
      ]).catch(this.__onError)
    }

    __onError = error => (
      error.code === "UNAUTHORIZED_EXCEPTION"
        ? console.error(error)
        : this.props.onError(error)
    )

    __tryRefreshToken = async (isExpired = true) => {
      if (!isExpired) {
        return
      }

      const refreshToken = await db.getItem("refreshToken")

      if (refreshToken) {
        throw new Error("No refresh token found. Need to authenticate first.")
      }

      const res = await mutate({
        mutation: refresh,
        variables: {
          refreshToken: refreshToken.payload
        }
      })

      const accessToken = res.data.refreshAccessToken

      await saveTokens({accessToken})
    }

    __onSuccess = () => void this.setState({isSuccess: true})

    render() {
      if (!this.state.isSuccess) {
        return <div>Authenticate....</div>
      }

      return h(observer(Target), this.props)
    }
  }

  if (isFunction(Target.getInitialProps)) {
    Auth.getInitialProps = Target.getInitialProps
  }

  return Auth
}

export default withAuth
