import Client from "apollo-client"

import {InMemoryCache} from "apollo-cache-inmemory"

import HttpLink from "./HttpLink"

const link = new HttpLink({uri: "http://localhost:2319/graphql"})
const cache = new InMemoryCache()

const client = new Client({link, cache})

export default client
