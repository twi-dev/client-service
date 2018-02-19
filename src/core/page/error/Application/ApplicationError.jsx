import {h} from "preact"
import {instanceOf} from "prop-types"

import Image from "./application-error.svg"

import {container} from "./application-error.sss"

// process.env.NODE_ENV !== "production"

const ApplicationError = ({error}) => (
  <div class={container}>
    <div>
      <Image />
    </div>
    <div>{String(error)}</div>
  </div>
)

ApplicationError.propTypes = {
  error: instanceOf(Error).isRequired
}

export default ApplicationError
