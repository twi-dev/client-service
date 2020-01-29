import map from "lib/helper/iterator/objectMapToArrayTasks"
import filter from "lib/helper/iterator/objectFilter"
import db from "lib/db/tokens"

/**
 * @return {Promise}
 */
function saveTokens(tokens) {
  tokens = filter(tokens, (_, key) => key !== "__typename")

  // console.log(tokens)

  return Promise.all(map(tokens, (token, name) => db.setItem(name, token)))
}

export default saveTokens
