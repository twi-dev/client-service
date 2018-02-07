import {h} from "preact"
import ErrorHandler from "./ErrorHandler"

const withErrorHandling = errorComponent => Target => (
  h(ErrorHandler, {errorComponent}, Target)
)

export default withErrorHandling
