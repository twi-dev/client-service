import Client from "apollo-client"

import {ApolloLink} from "apollo-link"
import {InMemoryCache as Cache} from "apollo-cache-inmemory"
import {createFormDataLink} from "apollo-link-form-data"

import {api} from "config"

import authContext from "./authContext"
import errorContext from "./errorContext"

const formDataLink = createFormDataLink({uri: api.uri})

const link = ApolloLink.from([errorContext, authContext, formDataLink])

const cache = new Cache()

const client = new Client({link, cache})

const query = client.query
const mutate = client.mutate
const watch = client.watchQuery

export {query, mutate, watch}
export default client
