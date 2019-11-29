import {createElement as h} from "react"

import getName from "lib/helper/component/getName"

import createContext from "./createContext"

const attachHandler = Target => {
  const {provider, consumer} = createContext()

  const AttachErrorHandler = props => h(Target, props)

  AttachErrorHandler.displayName = `AttachErrorHandler(${getName(Target)})`

  return provider(consumer(AttachErrorHandler))
}

export default attachHandler
