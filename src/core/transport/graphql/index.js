import Client from "apollo-client"

import {InMemoryCache as Cache} from "apollo-cache-inmemory"

import {api} from "config"

import HttpLink from "./HttpLink"

const link = new HttpLink({uri: api.uri})
const cache = new Cache()

const client = new Client({link, cache})

export default client
