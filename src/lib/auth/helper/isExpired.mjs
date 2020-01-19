import getTime from "date-fns/getTime"

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

  return Boolean(Date.now() >= getTime(accessToken.expires))
}

export default isExpired
