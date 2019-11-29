import Client from "apollo-client"

import {ApolloLink} from "apollo-link"
import {createFormDataLink} from "apollo-link-form-data"
import {InMemoryCache as Cache} from "apollo-cache-inmemory"

import {api} from "lib/config"

import auth from "./authContext"
import error from "./errorContext"
import refresh from "./refreshTokenLink"

const fd = createFormDataLink({uri: api.uri})

const link = ApolloLink.from([error, refresh, auth, fd])

const cache = new Cache()

const client = new Client({link, cache})

export const query = client.query
export const mutate = client.mutate
export const watch = client.watchQuery
export const watchQuery = client.watchQuery
export const readQuery = client.readQuery
export const writeQuery = client.writeQuery
export const readFragment = client.readFragment
export const writeFragment = client.writeQuery
export default client
