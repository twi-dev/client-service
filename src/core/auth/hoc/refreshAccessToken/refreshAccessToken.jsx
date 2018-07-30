import {createElement, Component} from "react"
import {shape} from "prop-types"
import {observer} from "mobx-react"

import ms from "ms"

import getName from "core/helper/component/getName"

const refreshAccessToken = Target => {
  @observer class RefreshAccessToken extends Component {
    static displayName = `RefreshAccessToken(${getName(Target)})`

    static propTypes = {
      session: shape({}).isRequired
    }

    componentDidMount = () => this.__updateToken()

    componentWillUnmount = () => this.__removeTimer()

    __timer = null

    __updateToken = () => {
      const session = this.props.session

      if (session) {
        this.__timer = setInterval(session.refreshAccessToken, ms("12m"))
      }
    }

    __removeTimer = () => {
      if (this.__timer) {
        clearInterval(this.__timer)
      }
    }

    render(props) {
      return createElement(Target, props)
    }
  }

  return RefreshAccessToken
}

export default refreshAccessToken
