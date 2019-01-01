import {createContext} from "react"

import createErrorHandlerProvider from "./createProvider"
import createErrorHandlerConsumer from "./createConsumer"

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
