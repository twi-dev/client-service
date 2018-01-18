import {h, Component, createElement} from "preact"
import {string, func, oneOfType} from "prop-types"

import isFunction from "lodash/isFunction"
import isString from "lodash/isString"

class AsyncRoute extends Component {
  static propTypes = {
    component: oneOfType([string, func]).isRequired,
    onError: func // FIXME: Make it REQUIRED
  }

  static defaultProps = {
    onError: console.error
  }

  constructor(...args) {
    super(...args)

    this.state = {
      isReady: false,
      component: null
    }
  }

  componentWillMount() {
    let component = this.props.component

    if (isFunction(component)) {
      component = component()
    } else if (isString(component)) {
      component = import(`module/${component}`)
    }

    Promise.resolve(component)
      .then(module => Promise.resolve(module.default))
      .then(this.__onComponentLoaded)
      .catch(this.props.onError)
  }

  __onComponentLoaded = component => this.setState({component, isReady: true})

  render() {
    const {isReady, component} = this.state

    return isReady
      ? createElement(component, this.props)
      : <div>Loading...</div>
  }
}

export default AsyncRoute
