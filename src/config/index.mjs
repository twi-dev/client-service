const merge = require("lodash/merge")

const concat = require("core/helper/util/concat").default

const defaults = require("../../config/default.yaml")

const envSpecific = require(`../../config/${process.env.NODE_ENV}.yaml`)

const env = {
  name: process.env.NODE_ENV,
  dev: process.env.NODE_ENV !== "production",
  test: process.env.NODE_ENV === "test",
  debug: process.env.NODE_ENV === "debug"
}

const config = merge({}, defaults, envSpecific, {env})

const host = concat(
  (config.server.https ? "https" : "http"), "://", config.server.host,
  (config.server.port && concat(":", config.server.port))
)

const uri = concat(
  host, (config.graphql.endpoint.startsWith("/") === false && "/"),
  config.graphql.endpoint
)

const subscriptions = concat(
  host, (config.graphql.subscriptions.startsWith("/") === false && "/"),
  config.graphql.subscriptions
)

config.api = {uri, subscriptions}

module.exports = config
