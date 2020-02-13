import partial from "lodash/partial"
import gql from "graphql-tag"

import {print} from "graphql/language/printer"
import {ApolloLink, Observable} from "apollo-link"

import {api} from "lib/config"

import getOperationName from "lib/helper/graphql/getOperationName"
import waterfall from "lib/helper/array/runWaterfall"
import isExpired from "lib/auth/helper/isExpired"
import getData from "lib/helper/graphql/getData"
import save from "lib/auth/helper/saveTokens"
import db from "lib/db/tokens"

const read = getData("authRefreshTokens")

const document = gql`
  mutation RefreshTokens($token: String!) {
    authRefreshTokens(refreshToken: $token) {
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

const name = getOperationName(document)

const refreshTokensLink = new ApolloLink(
  (operation, forward) => new Observable(observer => {
    let handle = null

    async function send(token) {
      const params = {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          operationName: name,
          query: print(document),
          variables: {
            token: token.payload
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

    async function performOperation() {
      const [accessToken, refreshToken] = await Promise.all([
        db.getItem("accessToken"), db.getItem("refreshToken")
      ])

      // Probably user is not authenticated, so we can just do nothing
      if (!refreshToken && !accessToken) {
        return finish()
      }

      if (isExpired(accessToken)) {
        return run(refreshToken)
      }

      return finish()
    }

    performOperation().catch(onRejected)

    return () => handle && handle.unsubscribe()
  })
)

export default refreshTokensLink
