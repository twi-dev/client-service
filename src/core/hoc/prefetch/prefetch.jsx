import {h, Component} from "preact"

import isFunction from "lodash/isFunction"
import merge from "lodash/merge"
import waterfall from "p-waterfall"

const assign = Object.assign

const defaults = {
  beforeLoad: () => ({}),

  afterLoad: () => ({}),

  beforeRender: component => component,

  // Make those two methods required
  onLoading: () => <div>Loading...</div>,

  onError: err => {
    console.error(err)

    return <div>Error!</div>
  }
}

// !! DEPRECATED !! //

/**
 * Load component chunk from server
 *
 * @example
 * export default prefetch(
 *   () => import("./MyComponent")
 * )
 */
const prefetchComponent = (loader, options = {}) => {
  if (process.env.NODE_ENV !== "production") {
    if (!isFunction(loader)) {
      throw new TypeError("Component loader must be a function.")
    }
  }

  const {
    beforeLoad, afterLoad, beforeRender,
    onError, onLoading
  } = assign({}, defaults, options)

  if (process.env.NODE_ENV !== "production") {
    if (!isFunction(onError)) {
      throw new TypeError("Error handler component required.")
    }

    if (!isFunction(onLoading)) {
      throw new TypeError("Preloader component required.")
    }
  }

  class PrefetchComponent extends Component {
    constructor() {
      super()

      this.__stages = {
        init: Symbol("init"),
        beforeLoad: Symbol("beforeLoad"),
        afterLoad: Symbol("afterLoad"),
        beforeRender: Symbol("beforeRender"),
        render: Symbol("render")
      }

      this.state = {
        Target: null,
        error: null,
        props: null,
        stage: this.__stages.init
      }
    }

    componentWillMount() {
      this.setState({stage: this.__stages.beforeLoad})

      waterfall(
        [this.__afterLoad, this.__beforeRender, this.__onFulfilled],

        Promise.all([beforeLoad(this.props), loader(this.props)])
      ).catch(console.error)
    }

    __onError = error => this.setState({error})

    __afterLoad = async ([props, mod]) => {
      this.setState({stage: this.__stages.afterLoad})

      props = merge({}, props, await afterLoad(this.props))

      return [mod.default, props, mod]
    }

    __beforeRender = ([Target, props, mod]) => {
      this.setState({stage: this.__stages.beforeRender, props})

      mod = assign({}, mod)

      delete mod.default

      return Promise.resolve(beforeRender(Target, props || this.props, mod))
    }

    __onFulfilled = Target => (
      this.setState({Target, stage: this.__stages.render})
    )

    render(props) {
      props = merge({}, this.state.props, props)

      if (this.state.error instanceof Error) {
        return h(onError, props)
      }

      if (this.state.stage !== this.__stages.render) {
        return h(onLoading, props)
      }

      return h(this.state.Target, props)
    }
  }

  return PrefetchComponent
}

export default prefetchComponent
