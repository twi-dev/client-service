import "whatwg-fetch"

import omit from "lodash/omit"
import waterfall from "p-waterfall"
import serialize from "@octetstream/object-to-form-data"

import {Observable, ApolloLink} from "apollo-link"
import {print} from "graphql/language/printer"

import processResponse from "./processResponse"

const assign = Object.assign

const defaults = {fetch}

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
      body.append("extensions", extensions)
    }

    if (httpOptions.includeQuery) {
      body.query = print(query)
    }

    body = serialize(body)

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

    const requestOptions = {
      method: "POST",
      headers: {
        accept: "*/*",
        ...headers
      },
      credentials,
      body
    }

    waterfall([onResponsed, onFulfilled], fetcher(uri, requestOptions))
      .catch(onRejected)
  }))
}

export default requestHandler
