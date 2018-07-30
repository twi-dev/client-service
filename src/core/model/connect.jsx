import {createElement as h} from "react"
import {Provider, observer, inject} from "mobx-react"

import isFunction from "lodash/isFunction"

import getName from "core/helper/component/getName"

const assign = Object.assign

const mapModelsToProps = models => assign({}, models)

/**
 * Connect MobX State Tree stores with Preact component.
 * Note: This HOC is also attaches the <Provider> component before given Target.
 *
 * @param {object | function} models – an object of MST model instances or
 *   a function that return the same object
 *
 * @return {(Target: Function | Component) => Component}
 */
const connect = models => Target => {
  models || (models = {})

  const Connect = props => (
    // Render mobx-react Provier with given models instances.
    h(
      Provider, isFunction(models) ? models(assign({}, props)) : models,

      // Connect Target component with models, subscribe and render.
      h(Target |> observer |> inject(mapModelsToProps), props)
    )
  )

  Connect.displayName = `${Connect.name}(${getName(Target)})`

  return Connect
}

export default connect
