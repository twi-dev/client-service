import {setContext} from "apollo-link-context"

import capitalize from "lodash/capitalize"
import isEmpty from "lodash/isEmpty"

import db from "lib/db/tokens"

async function authContext(_, {headers}) {
  const token = await db.getItem("accessToken")

  if (isEmpty(token)) {
    return {headers}
  }

  return {
    headers: {
      ...headers,

      authorization: `${capitalize(token.type)} ${token.payload}`
    }
  }
}

export default setContext(authContext)
