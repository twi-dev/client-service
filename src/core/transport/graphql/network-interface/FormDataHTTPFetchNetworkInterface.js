import fetch from "whatwg-fetch"

import {printAST, HTTPFetchNetworkInterface} from "apollo-client"

import toFormData from "core/helper/util/toFormData"

class FormDataHTTPFetchNetworkInterface extends HTTPFetchNetworkInterface {
  constructor(options) {
    const url = options.url || options.uri

    super(url, options)
  }

  fetchFromRemoteEndpoint({request, options}) {
    const endpoint = this._uri

    options = {
      ...this._opts,
      ...options,
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        Accept: "*/*",
        ...options.headers,
      }
    }

    // Transform variables obj to FormData
    const body = toFormData(request.variables, "variables")

    // if (body instanceof FormData) {
    //   // Add specific GraphQL fields
    //   body.append("operationName", request.operationName)
    //   body.append("query", printAST(request.query))
    // } else {}

    // Add specific GraphQL fields
    body.append("operationName", request.operationName)
    body.append("query", printAST(request.query))

    return fetch(endpoint, {
      ...options, body
    })
  }
}

export {FormDataHTTPFetchNetworkInterface}
export default FormDataHTTPFetchNetworkInterface
