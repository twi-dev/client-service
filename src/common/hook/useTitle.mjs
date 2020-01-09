import setTitle from "react-use/lib/useTitle"
import isString from "lodash/isString"

const {isArray} = Array

const defaults = {
  prefix: undefined,
  delimiter: "–",
  title: undefined,
  suffix: undefined
}

function useTitle(options = {}) {
  if (isString(options)) {
    options = {title: options}
  }

  let {prefix, title, suffix, delimiter} = {...defaults, ...options}

  if (!isArray(title)) {
    title = [title]
  }

  delimiter = ` ${delimiter.trim()} `

  setTitle([prefix, ...title, suffix].filter(Boolean).join(delimiter))
}

export default useTitle
