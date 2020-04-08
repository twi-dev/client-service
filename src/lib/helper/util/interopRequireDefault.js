import isObject from "lodash/isObject"

function interopRequireDefault(value) {
  if (isObject(value) && "__esModule" in value && "default" in value) {
    return value
  }

  return {default: value, __esModule: true}
}

export default interopRequireDefault
