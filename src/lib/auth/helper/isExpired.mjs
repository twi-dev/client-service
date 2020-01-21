import parseISO from "date-fns/parseISO"
import getTime from "date-fns/getTime"
import isString from "lodash/isString"

/**
 * Check if given accessToken is expired.
 *
 * @param {object} accessToken
 *
 * @return {boolean}
 */
function isExpired(accessToken) {
  if (!(accessToken || accessToken.expires)) {
    return true
  }

  let {expires} = accessToken
  if (isString(expires)) {
    expires = parseISO(expires)
  }

  return Boolean(Date.now() >= getTime(expires))
}

export default isExpired
