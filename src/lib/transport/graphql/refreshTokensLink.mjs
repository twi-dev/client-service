import partial from "lodash/partial"
import gql from "graphql-tag"

import {print} from "graphql/language/printer"
import {ApolloLink, Observable} from "apollo-link"

import {api} from "lib/config"

import getOperationName from "lib/helper/graphql/getOperationName"
import isAuthenticated from "lib/auth/helper/isAuthenticated"
import waterfall from "lib/helper/array/runWaterfall"
import getData from "lib/helper/graphql/getData"
import save from "lib/auth/helper/saveTokens"
import db from "lib/db/tokens"

const read = getData("authRefreshTokens")

const document = gql`
  mutation RefreshTokens {
    authRefreshTokens($refreshToken: String!) {
      accessToken {
        type
        expires
        payload
      }

      refreshToken {
        type
        payload
      }
    }
  }
`

const shouldUpdate = name => isAuthenticated().then(
  value => !(value || name === getOperationName(document))
)

const refreshTokenLink = new ApolloLink(
  (operation, forward) => new Observable(observer => {
    let handle = null

    async function send(token) {
      const params = {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          operationName: getOperationName(document),
          query: print(document),
          variables: {
            refreshToken: token.payload
          }
        })
      }

      return fetch(api.uri, params)
    }

    async function parse(response) {
      if (response.status >= 300) {
        throw new Error(`Network error: ${response.status}`)
      }

      return response.json()
    }

    function finish() {
      handle = forward(operation).subscribe({
        next: observer.next.bind(observer),
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer)
      })
    }

    function onRejected(reason) {
      if (reason.name !== "AbortError") {
        observer.error(reason)
      }
    }

    const run = partial(waterfall, [send, parse, read, save, finish])

    Promise.all([
      shouldUpdate(operation.operationName),
      db.getItem("refreshToken")
    ])
      .then(([active, token]) => active && token ? run(token) : finish())
      .catch(onRejected)

    return () => handle && handle.unsubscribe()
  })
)

export default refreshTokenLink
