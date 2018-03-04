import {h} from "preact"
import {instanceOf} from "prop-types"

import Image from "./application-error.svg"

import {container} from "./application-error.sss"

const ApplicationError = ({error}) => (
  <div class={container}>
    <div>
      <Image />
    </div>
    <div>{error.message}</div>
  </div>
)

ApplicationError.propTypes = {
  error: instanceOf(Error).isRequired
}

export default ApplicationError
