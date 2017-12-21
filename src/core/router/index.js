import {extname, basename} from "path"

import omit from "lodash/omit"

import asyncRouteDecorator from "./asyncRouteDecorator"

const ctx = require.context("../../route", true, /\.(jsx?|json)$/)

function extractRoute(prev, filename) {
  const ext = extname(filename)
  const prefix = basename(filename, ext)

  // React config
  const config = ctx(filename)

  // Add a prefix
  const res = []
  for (const route of config) {
    route.component = `${prefix}/${route.component}`

    const component = asyncRouteDecorator(omit(route, "path"))
    const path = prefix === "home"
      ? `/${route.path.replace(/^\//, "")}`
      : `/${prefix}/${route.path.replace(/^\//, "")}`

    res.push({path, component})
  }

  prev.push(...res)

  return prev
}

const routes = ctx.keys().reduce(extractRoute, [])

export default routes
