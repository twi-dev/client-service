import {h} from "preact"

import {container} from "./input.sss"

const Input = props => (
  <div className={container}>
    <input {...props} />
  </div>
)

export default Input
