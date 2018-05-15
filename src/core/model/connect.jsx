import {h} from "preact"
import {Provider, observer, inject} from "mobx-preact"

// import compose from "lodash/fp/compose"
import isFunction from "lodash/isFunction"

import getName from "core/helper/component/getName"

const assign = Object.assign

const mapModelsToProps = stores => ({...stores})

/**
 * Connect MobX State Tree stores with Preact component
 */
const connect = models => Target => {
  models || (models = {})

  const Connect = props => (
    // Render mobx-react Provier with given models instances.
    h(
      Provider, isFunction(models) ? models(assign({}, props)) : models,

      // Connect Target component with models, subscribe and render.
      // h(compose(inject(mapModelsToProps), observer)(Target), props)
      h(Target |> observer |> inject(mapModelsToProps), props)
    )
  )

  Connect.displayName = `${Connect.name}(${getName(Target)})`

  return Connect
}

export default connect
