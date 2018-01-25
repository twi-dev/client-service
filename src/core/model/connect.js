import {h} from "preact"
import {Provider, observer, inject} from "mobx-preact"

import compose from "lodash/fp/compose"

const mapModelsToProps = stores => ({...stores})

/**
 * Connect MobX State Tree stores with Preact component
 */
const connect = models => Target => {
  models || (models = {})

  const name = Target.displayName || Target.name || "Unknown"

  const Connect = props => h(
    // Render mobx-react Provier with given models instances.
    Provider, models,

    // Connect Target component with models, subscribe and render.
    h(compose(inject(mapModelsToProps), observer)(Target), props)
  )

  Connect.displayName = `${Connect.name}(${name})`

  return Connect
}

export default connect
