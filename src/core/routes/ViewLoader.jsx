import {h, Component} from "preact"
import {string, func, oneOfType} from "prop-types"

import omit from "lodash/omit"
import compose from "lodash/fp/compose"
import isFunction from "lodash/isFunction"
import waterfall from "p-waterfall"

import Loading from "common/component/Loading/Page"
import ApplicationError from "core/page/error/Application"

import withErrorHandler from "core/error/withErrorHandler"
import connect from "core/model/connect"

@withErrorHandler(ApplicationError)
class ViewLoader extends Component {
  static propTypes = {
    component: oneOfType([string, func]).isRequired,
    onError: func.isRequired // FIXME: Make it REQUIRED
  }

  constructor(...args) {
    super(...args)

    this.state = {
      isReady: false,
      component: null
    }
  }

  componentWillMount() {
    const component = this.props.component

    waterfall([
      this.__onComponentLoaded,
      this.__onComponentReceived,
      this.__onComponentReady
    ], import(`module/${component}`)).catch(this.props.onError)
  }

  __onComponentLoaded = module => Promise.resolve(module.default || module)

  __onComponentReceived = component => new Promise((resolve, reject) => {
    if (!isFunction(component.getInitialProps)) {
      return resolve(withErrorHandler(ApplicationError)(component))
    }

    const onFulfilled = initials => resolve(
      compose(withErrorHandler(ApplicationError), connect(initials))(component)
    )

    const ctx = omit(this.props, ["route", "component"])

    Promise.resolve(component.getInitialProps(ctx)).then(onFulfilled, reject)
  })

  __onComponentReady = component => this.setState({component, isReady: true})

  render(props) {
    const {isReady, component} = this.state

    return h(isReady ? component : Loading, omit(props, "onError"))
  }
}

export default ViewLoader
