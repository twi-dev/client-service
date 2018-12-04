import {createElement, Component} from "react"
import {shape} from "prop-types"
import {observer, inject} from "mobx-react"

import ms from "ms"

import getName from "core/helper/component/getName"

const mapStoresToProps = ({session}) => ({session})

const refreshAccessToken = Target => {
  @inject(mapStoresToProps) @observer
  class RefreshAccessToken extends Component {
    static displayName = `RefreshAccessToken(${getName(Target)})`

    static propTypes = {
      session: shape({}).isRequired
    }

    __timer = null

    componentDidMount = () => this.__createUpdater()

    componentWillUnmount = () => this.__cleanupUpdater()

    __updateToken = () => {
      if (this.props.session) {
        this.props.session.refreshAccessToken()
          .catch(console.error)
      }
    }

    __createUpdater = () => {
      this.__timer = setInterval(this.__updateToken, ms("12m"))
    }

    __cleanupUpdater = () => {
      if (this.__timer) {
        clearInterval(this.__timer)
      }
    }

    render() {
      return createElement(Target, this.props)
    }
  }

  return RefreshAccessToken
}

export default refreshAccessToken
