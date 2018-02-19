import {extname, basename} from "path"

import omit from "lodash/omit"

import withAsyncRoute from "./withAsyncRoute"

const ctx = require.context("../../route", true, /\.(jsx?|json)$/)

function extractRoute(prev, filename) {
  const ext = extname(filename)
  const prefix = basename(filename, ext)

  // React config
  const config = ctx(filename)

  // Add a prefix
  const res = []
  for (const route of config) {
    const component = withAsyncRoute(omit({
      route, component: `${prefix}/${route.component}`
    }, "path"))

    const path = prefix === "home"
      ? `/${route.path.replace(/^\//, "")}`
      : `/${prefix}/${route.path.replace(/^\//, "")}`

    res.push({path, component, filename})
  }

  prev.push(...res)

  return prev
}

const routes = ctx.keys().reduce(extractRoute, [])

export default routes
