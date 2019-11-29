import isObject from "lodash/isObject"

function resquireDefault(value) {
  if (isObject(value) && "__esModule" in value) {
    return value.default
  }

  return value
}

export default resquireDefault
