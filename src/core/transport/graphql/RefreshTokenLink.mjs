import {ApolloLink, Observable} from "apollo-link"

import waterfall from "core/helper/promise/arrayRunWaterfall"

class RefreshTokenLink extends ApolloLink {
  request = operation => new Observable(observer => {
    const ctx = operation.getContext()

    function onResponsed(response) {
      operation.setContext({response})

      if (response.status >= 300) {
        return Promise.reject(new Error(`Network error: ${response.status}`))
      }

      return response.json()
    }

    function onFulfilled(body) {
      observer.next(body)
      observer.complete()

      return body
    }

    function onRejected(reason) {
      if (reason.name !== "AbortError") {
        observer.error(reason)
      }
    }

    const params = {}

    waterfall([onResponsed, onFulfilled], fetch(ctx.url, params))
      .catch(onRejected)
  })
}

export default RefreshTokenLink
