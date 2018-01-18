import {h} from "preact"
import {object} from "prop-types"

const ApplicationError = ({error}) => <div>{error}</div>

ApplicationError.propTypes = {
  error: object // eslint-disable-line
}

export default ApplicationError
