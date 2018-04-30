import {h, Component} from "preact"
import {shape} from "prop-types"
import {observer} from "mobx-preact"

import ms from "ms"

const refreshAccessToken = Target => {
  const name = Target.displayName || Target.name || "Unknown"

  @observer class RefreshAccessToken extends Component {
    static displayName = `RefreshAccessToken(${name})`

    static propTypes = {
      session: shape({}).isRequired
    }

    componentWillMount = () => this.__updateToken()

    componentDidUnmount = () => this.__removeTimer()

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
      return h(Target, props)
    }
  }

  return RefreshAccessToken
}

export default refreshAccessToken
