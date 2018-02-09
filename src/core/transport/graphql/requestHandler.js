import "whatwg-fetch"

import omit from "lodash/omit"
import waterfall from "p-waterfall"
import serialize from "@octetstream/object-to-form-data"

import {Observable, ApolloLink} from "apollo-link"
import {print} from "graphql/language/printer"

import hasFiles from "./hasFiles"
import processResponse from "./processResponse"

const assign = Object.assign

const defaults = {
  fetch,
  headers: {
    accept: "*/*"
  }
}

const defaultHTTPOptions = {
  includeQuery: true,
  includeExtensions: false
}

function requestHandler(options = {}) {
  options = assign({}, defaults, options)

  const fetcher = options.fetch
  const {includeExtensions, headers} = options

  let uri = options.uri

  options = omit(options, ["uri", "fetch", "includeExtensions"])

  return new ApolloLink(operation => new Observable(observer => {
    const ctx = operation.getContext()
    const httpOptions = assign({}, defaultHTTPOptions, ctx.http)

    const {operationName, query, variables, extensions} = operation

    const credentials = ctx.credentials || options.credentials

    let body = {operationName, variables}

    if (ctx.uri) {
      uri = ctx.uri
    }

    if (includeExtensions || httpOptions.includeExtensions) {
      body.extensions = extensions
    }

    if (httpOptions.includeQuery) {
      body.query = print(query)
    }

    if (hasFiles(body)) {
      body = serialize(body)

      headers.accept = "*/*"
    } else {
      body = JSON.stringify(body)

      headers["content-type"] = "application/json"
    }

    function onResponsed(resoponse) {
      operation.setContext({resoponse})

      return processResponse(resoponse)
    }

    function onFulfilled(result) {
      observer.next(result)
      observer.complete()

      return Promise.resolve(result)
    }

    function onRejected(err) {
      if (err.name === "AbortError") {
        return
      }

      observer.error(err)
    }

    const params = {headers, credentials, body, method: "POST"}

    // Make a request with FormData or JSON body.
    waterfall([onResponsed, onFulfilled], fetcher(uri, params))
      .catch(onRejected)
  }))
}

export default requestHandler
