import Client from "apollo-client"

import Transport from "./network-interface/FormDataHTTPFetchNetworkInterface"

const networkInterface = new Transport({
  url: "http://localhost:1337/graphql", // tmp
})

const client = new Client({
  networkInterface
})

export default client
