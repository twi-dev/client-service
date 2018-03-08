import map from "core/helper/iterator/objectMapToArrayTasks"
import filter from "core/helper/iterator/objectFilter"
import db from "core/db/tokens"

/**
 * @return {Promise}
 */
function saveTokens(tokens) {
  tokens = filter(tokens, (_, key) => key !== "__typename")

  return Promise.all(map(tokens, (token, name) => db.setItem(name, token)))
}

export default saveTokens
