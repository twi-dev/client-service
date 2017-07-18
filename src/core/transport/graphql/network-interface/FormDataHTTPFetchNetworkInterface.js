import fetch from "isomorphic-fetch"

import {printAST, HTTPFetchNetworkInterface} from "apollo-client"

import toFormData from "frontend/helper/util/toFormData"

class FormDataHTTPFetchNetworkInterface extends HTTPFetchNetworkInterface {
  constructor(options) {
    super(options.url, options)
  }

  fetchFromRemoteEndpoint({request, options}) {
    // Transform variables obj to FormData
    const body = toFormData(request.variables, "variables")

    // Add specific GraphQL fields
    body.append("operationName", request.operationName)
    body.append("query", printAST(request.query))

    return fetch(this._uri, {
      ...this._opts,
      ...options,
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        Accept: "*/*",
        ...options.headers,
      },
      body
    })
  }

  setCookieHeader = cookie => {
    if (!this._opts.headers) {
      this._opts.headers = {}
    }

    this._opts.headers.Cookie = cookie
  }
}

export {FormDataHTTPFetchNetworkInterface}
export default FormDataHTTPFetchNetworkInterface
