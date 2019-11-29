import {observer, inject} from "mobx-react"

/**
 * Connect Target component with models, subscribe and render.
 * A shortcut of the injecr(models)(observer(Target))
 *
 * @param {object | function | string} models – an object of MST model
 *   instances or a function that return the same object
 *
 * @return Function | Component
 */
const connect = models => Target => Target |> observer |> inject(models)

export default connect
