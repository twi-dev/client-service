import {setContext} from "apollo-link-context"

import capitalize from "lodash/capitalize"
import isEmpty from "lodash/isEmpty"

import db from "core/db"

const assign = Object.assign

async function authContext(_, {headers}) {
  const token = await db.getItem("accessToken")

  if (!isEmpty(token)) {
    headers = assign({}, {
      authorization: `${capitalize(token.type)} ${token.payload}`
    })
  }

  return {headers}
}

export default setContext(authContext)
