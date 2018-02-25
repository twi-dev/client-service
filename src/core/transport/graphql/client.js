import Client from "apollo-client"

import {ApolloLink} from "apollo-link"
import {InMemoryCache as Cache} from "apollo-cache-inmemory"

import {api} from "config"

import Link from "./HttpLink"

import authContext from "./authContext"
import errorContext from "./errorContext"

const link = ApolloLink.from([
  errorContext, authContext, new Link({uri: api.uri})
])

const cache = new Cache()

const client = new Client({link, cache})

const query = client.query
const mutate = client.mutate
const watch = client.watchQuery

export {query, mutate, watch}
export default client
