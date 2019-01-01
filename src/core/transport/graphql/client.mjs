import Client from "apollo-client"

import {ApolloLink} from "apollo-link"
import {createFormDataLink} from "apollo-link-form-data"
import {InMemoryCache as Cache} from "apollo-cache-inmemory"

import {api} from "core/config"

import authContext from "./authContext"
import errorContext from "./errorContext"
import refreshToken from "./refreshTokenLink"

const fd = createFormDataLink({uri: api.uri})

const link = ApolloLink.from([errorContext, refreshToken, authContext, fd])

const cache = new Cache()

const client = new Client({link, cache})

const {query, mutate, watchQuery} = client

export {query, mutate, watchQuery, watchQuery as watch}
export default client
