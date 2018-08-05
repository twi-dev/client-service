import React from "react"

import {container} from "./timeout-error.scss"

const TimeoutError = () => (
  <div className={container}>
    Request timed out.
  </div>
)

export default TimeoutError
