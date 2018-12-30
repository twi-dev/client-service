import Client from "apollo-client"

import {ApolloLink} from "apollo-link"
import {InMemoryCache as Cache} from "apollo-cache-inmemory"
import {createFormDataLink} from "apollo-link-form-data"

import {api} from "config"

import authContext from "./authContext"
import errorContext from "./errorContext"
import refreshToken from "./refreshTokenLink"

const formDataLink = createFormDataLink({uri: api.uri})

const link = ApolloLink.from([
  errorContext,
  refreshToken,
  authContext,
  formDataLink
])

const cache = new Cache()

const client = new Client({link, cache})

const {query, mutate, watchQuery} = client

export {query, mutate, watchQuery, watchQuery as watch}
export default client
