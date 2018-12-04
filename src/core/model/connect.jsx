import {createElement as h} from "react"
import {observer, inject} from "mobx-react"

import getName from "core/helper/component/getName"

/**
 * Connect Target component with models, subscribe and render.
 *
 * @param {object | function} models – an object of MST model instances or
 *   a function that return the same object
 *
 * @return {(Target: Function | Component) => Component}
 */
const connect = models => Target => {
  const Connect = props => h(Target |> observer |> inject(models), props)

  Connect.displayName = `$Connect(${getName(Target)})`

  return Connect
}

export default connect
