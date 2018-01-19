import {h} from "preact"
import {instanceOf} from "prop-types"

const ApplicationError = ({error}) => <div>{error}</div>

ApplicationError.propTypes = {
  error: instanceOf(Error).isRequired
}

export default ApplicationError
