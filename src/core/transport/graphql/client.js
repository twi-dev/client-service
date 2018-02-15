import Client from "apollo-client"

import {InMemoryCache as Cache} from "apollo-cache-inmemory"

import {api} from "config"

import Link from "./HttpLink"

const link = new Link({uri: api.uri})
const cache = new Cache()

const client = new Client({link, cache})

const query = client.query
const mutate = client.mutate
const watch = client.watchQuery

export {query, mutate, watch}
export default client
