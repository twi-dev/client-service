import Client from "apollo-client"

import {InMemoryCache as Cache} from "apollo-cache-inmemory"

import {api} from "config"

import Link from "./HttpLink"

const link = new Link({uri: api.uri, credentials: "include"})
const cache = new Cache()

const client = new Client({link, cache})

export default client
