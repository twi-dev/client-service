import isFunction from "lodash/isFunction"

function createReporter(matcher) {
  if (!isFunction(matcher)) {
    throw new TypeError("Errors matcher must be a function.")
  }

  const reporter = ({error, info}) => matcher({error, info})

  return reporter
}

export default createReporter
