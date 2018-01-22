import {h, Component} from "preact"
import {Provider, observer, inject} from "mobx-react"

import compose from "lodash/compose"
import isFunction from "lodash/isFunction"

const mapModelsToProps = stores => ({...stores})

/**
 * Connect MobX State Tree stores with Preact component
 */
const connect = getInitialModels => Target => {
  const name = Target.displayName || Target.name || "Unknown"

  class Connect extends Component {
    static displayName = `${this.constructor.name}(${name})`

    state = {
      models: null
    }

    async componentWillMount() {
      // Optionally, get initial props for component as models instances
      if (isFunction(getInitialModels)) {
        // TODO: Add some ctx stuff
        // FIXME: Maybe I need to force returning type to be an object
        this.setState({models: (await getInitialModels(this) || {})})
      }
    }

    render(props) {
      return h(
        // Render mobx-react Provier with given models instances.
        Provider, {
          ...this.state.models
        },

        // Connect Target component with models, subscribe and render.
        h(compose(inject(mapModelsToProps), observer)(Target), {
          ...props
        })
      )
    }
  }

  return Connect
}

export default connect
