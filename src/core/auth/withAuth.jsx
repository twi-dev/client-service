// UNAUTHORIZED_EXCEPTION
import {h, Component} from "preact"
import {func} from "prop-types"

import waterfall from "p-waterfall"

import db from "core/db"
import saveTokens from "core/auth/saveTokens"

import {mutate} from "core/transport/graphql"

import refresh from "./refreshAccessToken.gql"

const withAuth = Target => {
  const name = Target.displayName || Target.name || "Unknown"

  class AuthGate extends Component {
    static displayName = `${AuthGate.name}(${name})`

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
        this.__isTokenExpired,
        this.__tryRefreshToken,
        this.__onSuccess
      ]).catch(this.__onError)
    }

    __onError = error => (
      error.code === "UNAUTHORIZED_EXCEPTION"
        ? console.error(error)
        : this.props.onError(error)
    )

    __isTokenExpired = async () => {
      const token = await db.getItem("accessToken")

      const now = new Date()
      const expires = new Date(token.expires)

      return now.getTime() >= expires.getTime()
    }

    __tryRefreshToken = async isExpired => {
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
      console.log(this.props)

      if (!this.state.isSuccess) {
        return <div>Authenticate....</div>
      }

      return h(Target, this.props)
    }
  }

  return AuthGate
}

export default withAuth
