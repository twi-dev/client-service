import isPlainObject from "lodash/isPlainObject"
import isArray from "lodash/isArray"
import isEmpty from "lodash/isEmpty"

import objectIterator from "iterator/objectIterator"

/**
 * Transform given state object to form-data
 *
 * @param object state
 *
 * @return FormData instance
 */
function toFormData(obj, root) {
  const fd = new FormData()

  /**
   * Append object fields to FormData instance
   *
   * @param null|string key – parent field key
   * @param any value
   *
   * @api private
   */
  function append(key, value) {
    for (const [k, v] of objectIterator.entries(value)) {
      const name = key ? `${key}[${k}]` : key

      if ((isArray(v) || isPlainObject(v)) && !isEmpty(v)) {
        append(name, v)
      } else {
        fd.append(name, v)
      }
    }
  }

  append(root, obj)
  return fd
}

export default toFormData
