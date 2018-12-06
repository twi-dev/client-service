import {createContext} from "react"

import createErrorHandlerProvider from "./createErrorHandlerProvider"
import createErrorHandlerConsumer from "./createErrorHandlerConsumer"

/**
 * @api public
 */
function createErrorContext() {
  const {Provider, Consumer} = createContext()

  const provider = createErrorHandlerProvider(Provider)
  const consumer = createErrorHandlerConsumer(Consumer)

  return {provider, consumer}
}

export default createErrorContext
