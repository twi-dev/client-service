import {createElement} from "react"

import {container} from "./timeout-error.css"

const TimeoutError = () => (
  <div className={container}>
    Request timed out.
  </div>
)

export default TimeoutError
