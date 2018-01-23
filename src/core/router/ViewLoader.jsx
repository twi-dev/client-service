import {h, Component, createElement} from "preact"
import {string, func, oneOfType} from "prop-types"

import isFunction from "lodash/isFunction"
import isString from "lodash/isString"
import waterfall from "p-waterfall"

import connect from "core/model/connect"

class ViewLoader extends Component {
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

    waterfall([
      this.__onComponentLoaded,
      this.__onComponentReceived,
      this.__onComponentReady
    ], Promise.resolve(component)).catch(this.props.onError)
  }

  __onComponentLoaded = module => Promise.resolve(module.default || module)

  __onComponentReceived = component => new Promise((resolve, reject) => {
    if (!isFunction(component.getInitialProps)) {
      return resolve(component)
    }

    const onFulfilled = initials => resolve(connect(initials)(component))

    Promise.resolve(component.getInitialProps()).then(onFulfilled, reject)
  })

  __onComponentReady = component => this.setState({component, isReady: true})

  render(props) {
    const {isReady, component} = this.state

    return isReady
      ? createElement(component, props)
      : <div>Loading...</div>
  }
}

export default ViewLoader
