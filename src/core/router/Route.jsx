import {h, Component} from "preact"
import {string, func, oneOfType} from "prop-types"

import isFunction from "lodash/isFunction"
import isString from "lodash/isString"

class AsyncRoute extends Component {
  static propTypes = {
    component: oneOfType([string, func]).isRequired
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
      component = import(`${component}`)
    }

    Promise.resolve(component)
      .then(this.__onComponentLoaded)
      .catch(console.error) // TODO: Make a true-way application errors
  }

  __onComponentLoaded = component => this.setState({component, isReady: true})

  render() {
    const {isReady, component} = this.state

    return <div>{isReady ? component : "Loading..."}</div>
  }
}

export default AsyncRoute
